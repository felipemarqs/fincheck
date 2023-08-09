import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidadeBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidadeTransactionOwnershipService } from './validade-transaction-ownership.service';
import { ValidadeCategoryOwnershipService } from '../../categories/services/validade-category-ownership.service';
import { promises } from 'dns';
import { log } from 'console';
import { TransactionType } from '../entities/Transaction';
@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validadeBankAccountOwnershipService: ValidadeBankAccountOwnershipService,
    private readonly validadeCategoryOwnershipService: ValidadeCategoryOwnershipService,
    private readonly validadeTransactionOwnershipService: ValidadeTransactionOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    // Desestruturando o body
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    });

    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  async findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    const bankAccountId = filters.bankAccountId;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
    });
    return this.transactionsRepo.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });
    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: { bankAccountId, categoryId, date, name, type, value },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({
      userId,
      transactionId,
    });

    await this.transactionsRepo.delete({
      where: { id: transactionId },
    });
    return null;
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
