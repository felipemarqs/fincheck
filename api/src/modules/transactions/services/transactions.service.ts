import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
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

type Transaction = {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string | null;
  creditCardId: string | null;
  installmentPurchaseId: string | null;
  name: string;
  value: number;
  date: Date;
  type: 'INCOME' | 'EXPENSE';
  isPaid: boolean;
  createdAt: Date;
  installment: {
    id: string;
  };
};

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly creditCardService: CreditCardsService,
    @Inject(forwardRef(() => InstallmentPurchasesService))
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

  async canUpdateTransaction(
    originalTransaction: Transaction,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value, creditCardId } =
      updateTransactionDto;

    const isEqual =
      originalTransaction.bankAccountId === bankAccountId &&
      originalTransaction.categoryId === categoryId &&
      originalTransaction.date.toISOString() === date &&
      originalTransaction.name === name &&
      originalTransaction.type === type &&
      originalTransaction.value === value &&
      originalTransaction.creditCardId === creditCardId;

    if (!isEqual) {
      throw new ConflictException(
        "Você só pode atualizar o campo 'Marcar como pago' em transações de compras parceladas.",
      );
    }
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

    if (type !== TransactionType.EXPENSE && creditCardId) {
      throw new ConflictException(
        'Transações feitas com cartão podem ser somente de despesas!',
      );
    }

    //@ts-ignore
    const transactionFound: Transaction = await this.transactionsRepo.findFirst(
      {
        where: { id: transactionId },
        include: { installment: true },
      },
    );

    if (transactionFound.installment) {
      this.canUpdateTransaction(transactionFound, updateTransactionDto);
    }

    const isPaidUpdated = transactionFound.isPaid !== isPaid;

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
    if (transactionFound.installment) {
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
    //@ts-ignore
    const transactionFound: Transaction = await this.transactionsRepo.findFirst(
      {
        where: { id: transactionId },
        include: { installment: true },
      },
    );

    if (transactionFound.installmentPurchaseId) {
      throw new ConflictException(
        'Transações de compras parceladas não podem ser excluídas individualmente!',
      );
    }

    await this.validateEntitiesOwnership({
      userId,
      transactionId,
    });

    await this.transactionsRepo.delete({
      where: { id: transactionId },
    });
    return null;
  }

  async removefromInstallmentPurchase(
    userId: string,
    installmentPurchaseId: string,
  ) {
    const transactionsFound = await this.transactionsRepo.findMany({
      where: { installmentPurchaseId: installmentPurchaseId },
    });

    for (const transaction of transactionsFound) {
      if (!transaction.isPaid) {
        await this.creditCardService.updateAvailableLimit(
          transaction.creditCardId,
          transaction.value,
        );
      }

      await this.validateEntitiesOwnership({
        userId,
        transactionId: transaction.id,
      });

      await this.transactionsRepo.delete({
        where: { id: transaction.id },
      });
    }

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
