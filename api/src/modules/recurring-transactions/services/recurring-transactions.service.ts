import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RecurringTransactionsRepository } from 'src/shared/database/repositories/recurring-transactions.repositories';
import { Prisma, RecurrenceType } from '@prisma/client';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

import { ValidadeBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidadeCategoryOwnershipService } from 'src/modules/categories/services/validade-category-ownership.service';
import { ValidadeTransactionOwnershipService } from 'src/modules/transactions/services/validade-transaction-ownership.service';
import { CreateRecurringTransactionDto } from '../dto/create-recurring-transation.dto';

@Injectable()
export class RecurringTransactionsService {
  constructor(
    private readonly recurringTransactionsRepo: RecurringTransactionsRepository,
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validadeBankAccountOwnershipService: ValidadeBankAccountOwnershipService,
    private readonly validadeCategoryOwnershipService: ValidadeCategoryOwnershipService,
    private readonly validadeTransactionOwnershipService: ValidadeTransactionOwnershipService,
  ) {}

  private readonly logger = new Logger(RecurringTransactionsService.name);

  private number = 0;

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const today = new Date();
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(today.getMonth() - 2);

    const recurringTransactions = await this.recurringTransactionsRepo.findMany(
      {
        where: {
          startDate: {
            gte: twoMonthsAgo,
          },
        },
      },
    );

    for (const rt of recurringTransactions) {
      if (this.shouldCreateTransaction(rt, today)) {
        // this.logger.debug('🔹Transação criada');
        await this.transactionsRepo.create({
          data: {
            userId: rt.userId,
            bankAccountId: rt.bankAccountId,
            categoryId: rt.categoryId,
            name: rt.name,
            value: rt.value,
            date: today,
            type: rt.value >= 0 ? 'INCOME' : 'EXPENSE',
          },
        });
      }
    }
  }

  //CreateRecurringTransactionDto

  shouldCreateTransaction(
    rt: CreateRecurringTransactionDto,
    date: Date,
  ): boolean {
    const startDate = new Date(rt.startDate);
    if (rt.endDate && new Date(rt.endDate) < date) return false;

    switch (rt.recurrence) {
      case RecurrenceType.DAILY:
        return true;
      case RecurrenceType.WEEKLY:
        return date.getDay() === startDate.getDay();
      case RecurrenceType.MONTHLY:
        return date.getDate() === startDate.getDate();
      case RecurrenceType.YEARLY:
        return (
          date.getDate() === startDate.getDate() &&
          date.getMonth() === startDate.getMonth()
        );
      default:
        return false;
    }
  }

  async create(
    userId: string,
    createRecurringTransactionDto: CreateRecurringTransactionDto,
  ) {
    const {
      bankAccountId,
      name,
      recurrence,
      startDate,
      value,
      categoryId,
      endDate,
    } = createRecurringTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    });
    return this.recurringTransactionsRepo.create({
      data: {
        name,
        recurrence,
        startDate,
        value,
        bankAccountId,
        userId,
        categoryId,
        endDate,
      },
    });
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validadeTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validadeBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validadeCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
