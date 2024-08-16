import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

import { promises } from 'dns';
import { log } from 'console';
import { TransactionType } from '../entities/Transaction';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { ValidateCreditCardOwnershipService } from 'src/modules/credit-cards/services/validate-credit-card-ownership.service';
import { CreditCardsService } from 'src/modules/credit-cards/services/credit-cards.service';
import { InstallmentPurchasesService } from 'src/modules/installment-purchases/services/installment-purchases.service';
@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly creditCardService: CreditCardsService,
    private readonly installmentPurchaseService: InstallmentPurchasesService,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    private readonly validateCreditCardOwnershipService: ValidateCreditCardOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    // Desestruturando o body
    const {
      bankAccountId,
      categoryId,
      date,
      name,
      type,
      value,
      isPaid,
      creditCardId,
    } = createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      creditCardId,
    });

    if (type !== TransactionType.EXPENSE && creditCardId) {
      throw new ConflictException(
        'Transações feitas com cartão podem ser somente de despesas!',
      );
    }

    if (creditCardId && !isPaid) {
      await this.creditCardService.updateAvailableLimit(creditCardId, -value);
    }

    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        creditCardId,
        categoryId,
        date,
        name,
        type,
        value,
        isPaid,
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
        installment: { select: { id: true } },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const {
      bankAccountId,
      categoryId,
      date,
      name,
      type,
      value,
      isPaid,
      creditCardId,
    } = updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
      creditCardId,
    });

    const transactionFound = await this.transactionsRepo.findFirst({
      where: { id: transactionId },
      include: { installment: true },
    });

    const isPaidUpdated = transactionFound.isPaid !== isPaid;
    if (type !== TransactionType.EXPENSE && creditCardId) {
      throw new ConflictException(
        'Transações feitas com cartão podem ser somente de despesas!',
      );
    }

    if (transactionFound.creditCardId && !isPaid && isPaidUpdated) {
      await this.creditCardService.updateAvailableLimit(
        transactionFound.creditCardId,
        -value,
      );
    }

    if (transactionFound.creditCardId && isPaid && isPaidUpdated) {
      await this.creditCardService.updateAvailableLimit(
        transactionFound.creditCardId,
        value,
      );
    }

    console.log(transactionFound);
    //@ts-ignore
    if (transactionFound.installment.id) {
      await this.installmentPurchaseService.updateInstallment(
        //@ts-ignore
        transactionFound.installment.id,
        {
          paid: isPaid,
        },
      );
    }

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
        isPaid,
        creditCardId,
      },
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
