import {
  BadGatewayException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateInstallmentPurchaseDto } from '../dto/create-installment-purchase.dto';
import { UpdateInstallmentPurchaseDto } from '../dto/update-installment-purchase.dto';
import { InstallmentsPurchasesRepository } from 'src/shared/database/repositories/installment-purchases.repositories';
import { InstallmentsRepository } from 'src/shared/database/repositories/installments.repositories';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateInstallmentPurchaseOwnershipService } from './validate-installment-purchase-ownership.service';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from 'src/modules/transactions/services/validate-transaction-ownership.service';
import { CreditCardsService } from 'src/modules/credit-cards/services/credit-cards.service';
import { TransactionsService } from 'src/modules/transactions/services/transactions.service';

@Injectable()
export class InstallmentPurchasesService {
  constructor(
    @Inject(forwardRef(() => TransactionsService))
    private readonly transactionsService: TransactionsService,
    private readonly installmentPurchasesRepo: InstallmentsPurchasesRepository,
    private readonly installmentsRepo: InstallmentsRepository,
    private readonly transactionsRepo: TransactionsRepository,
    private readonly creditCardService: CreditCardsService,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    private readonly validateInstallmentPurchaseOwnershipService: ValidateInstallmentPurchaseOwnershipService,
  ) {}

  async create(
    userId: string,
    createInstallmentPurchaseDto: CreateInstallmentPurchaseDto,
  ) {
    const {
      bankAccountId,
      categoryId,
      name,
      numberOfInstallments,
      startDate,
      totalValue,
      type,
      creditCardId,
    } = createInstallmentPurchaseDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    const installmentPurchase = await this.installmentPurchasesRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        totalValue,
        numberOfInstallments,
        startDate,
        type,
        creditCardId,
      },
    });

    if (creditCardId) {
      await this.creditCardService.updateAvailableLimit(
        creditCardId,
        -totalValue,
      );
    }

    await this.createInstallments(
      userId,
      installmentPurchase.id,
      createInstallmentPurchaseDto,
    );

    return installmentPurchase;
  }

  async findAll(userId: string) {
    return await this.installmentPurchasesRepo.findMany({
      where: { userId },
      include: {
        installments: {
          select: {
            id: true,
            dueDate: true,
            installmentPurchase: true,
            installmentPurchaseId: true,
            paid: true,
            transaction: true,
            transactionId: true,
            value: true,
          },
          orderBy: { dueDate: 'asc' },
        },
        category: true,
        bankAccount: true,
        creditCard: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} installmentPurchase`;
  }

  async createInstallments(
    userId: string,
    installmentPurchaseId: string,
    createInstallmentPurchaseDto: CreateInstallmentPurchaseDto,
  ) {
    const {
      bankAccountId,
      categoryId,
      name,
      numberOfInstallments,
      startDate,
      totalValue,
      type,
      creditCardId,
    } = createInstallmentPurchaseDto;
    const installmentValue = totalValue / numberOfInstallments;

    for (let i = 0; i < numberOfInstallments; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      const transaction = await this.transactionsRepo.create({
        data: {
          userId: userId,
          bankAccountId: bankAccountId,
          installmentPurchaseId: installmentPurchaseId,
          categoryId,
          name: `${name} - Parcela ${i + 1}`,
          value: installmentValue,
          date: dueDate,
          type: type,
          isPaid: false,
          creditCardId,
        },
      });

      await this.installmentsRepo.create({
        data: {
          transactionId: transaction.id,
          installmentPurchaseId: installmentPurchaseId,
          value: installmentValue,
          dueDate: dueDate,
          paid: false,
        },
      });
    }
  }

  async update(
    userId: string,
    installmentPurchaseId: string,
    updateInstallmentPurchaseDto: UpdateInstallmentPurchaseDto,
  ) {
    const {
      bankAccountId,
      categoryId,
      name,
      numberOfInstallments,
      startDate,
      totalValue,
      type,
      creditCardId,
    } = updateInstallmentPurchaseDto;
    await this.validateEntitiesOwnership({
      userId,
      installmentPurchaseId,
      bankAccountId,
      categoryId,
    });

    const installmentPurchaseFound =
      await this.installmentPurchasesRepo.findFirst({
        where: { id: installmentPurchaseId },
      });

    const installmentPurchaseValueChanged =
      installmentPurchaseFound.totalValue !== totalValue;

    const updateCreditCardLimitValue =
      totalValue - installmentPurchaseFound.totalValue;

    const updatedInstallmentPurchase =
      await this.installmentPurchasesRepo.update({
        data: {
          userId,
          bankAccountId,
          categoryId,
          name,
          totalValue,
          numberOfInstallments,
          startDate,
          type,
          creditCardId,
        },
        where: { id: installmentPurchaseId },
      });

    if (
      creditCardId &&
      installmentPurchaseFound.creditCardId &&
      installmentPurchaseValueChanged
    ) {
      await this.creditCardService.updateAvailableLimit(
        creditCardId,
        -updateCreditCardLimitValue,
      );
    }

    if (
      (creditCardId && !installmentPurchaseFound.creditCardId) ||
      installmentPurchaseFound.creditCardId !== creditCardId
    ) {
      await this.creditCardService.updateAvailableLimit(
        creditCardId,
        -totalValue,
      );

      if (installmentPurchaseFound.creditCardId) {
        await this.creditCardService.updateAvailableLimit(
          installmentPurchaseFound.creditCardId,
          installmentPurchaseFound.totalValue,
        );
      }
    }

    await this.installmentsRepo.deleteMany({
      where: { installmentPurchaseId: installmentPurchaseId },
    });

    await this.transactionsRepo.deleteMany({
      where: { installmentPurchaseId: installmentPurchaseId },
    });

    await this.createInstallments(
      userId,
      installmentPurchaseId,
      updateInstallmentPurchaseDto,
    );
    return updatedInstallmentPurchase;
  }

  async updateInstallment(
    installmentId: string,
    installmentData: {
      transactionId?: string;
      installmentPurchaseId?: string;
      value?: number;
      dueDate?: string;
      paid?: boolean;
    },
  ) {
    return await this.installmentsRepo.update({
      where: { id: installmentId },
      data: installmentData,
    });
  }

  async remove(userId: string, installmentPurchaseId: string) {
    await this.transactionsService.removefromInstallmentPurchase(
      userId,
      installmentPurchaseId,
    );

    throw new BadGatewayException('HEHE CAIU!');

    await this.installmentPurchasesRepo.delete({
      where: { id: installmentPurchaseId },
    });

    return;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
    installmentPurchaseId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
    installmentPurchaseId?: string;
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
      installmentPurchaseId &&
        this.validateInstallmentPurchaseOwnershipService.validate(
          userId,
          installmentPurchaseId,
        ),
    ]);
  }
}
