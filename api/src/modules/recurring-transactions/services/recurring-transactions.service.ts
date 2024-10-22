import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RecurringTransactionsRepository } from 'src/shared/database/repositories/recurring-transactions.repositories';
import { Prisma, RecurrenceType } from '@prisma/client';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';

import { CreateRecurringTransactionDto } from '../dto/create-recurring-transation.dto';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from 'src/modules/transactions/services/validate-transaction-ownership.service';
import { ValidateCreditCardOwnershipService } from 'src/modules/credit-cards/services/validate-credit-card-ownership.service';

@Injectable()
export class RecurringTransactionsService {
  constructor(
    private readonly recurringTransactionsRepo: RecurringTransactionsRepository,
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    private readonly validateCreditCardOwnershipService: ValidateCreditCardOwnershipService,
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
      if (
        this.shouldCreateTransaction(rt as CreateRecurringTransactionDto, today)
      ) {
        this.logger.debug('🔹Transação criada');
        console.log(rt);
        await this.transactionsRepo.create({
          data: {
            userId: rt.userId,
            bankAccountId: rt.bankAccountId,
            categoryId: rt.categoryId,
            name: rt.name,
            value: rt.value,
            date: today,
            type: rt.type,
            isPaid: true,
            creditCardId: rt.creditCardId,
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
      type,
      creditCardId,
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
        type,
        creditCardId,
      },
    });
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
    creditCardId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
    creditCardId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
      creditCardId &&
        this.validateCreditCardOwnershipService.validate(userId, creditCardId),
    ]);
  }
}
