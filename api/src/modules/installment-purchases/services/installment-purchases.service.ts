import { Injectable } from '@nestjs/common';
import { CreateInstallmentPurchaseDto } from '../dto/create-installment-purchase.dto';
import { UpdateInstallmentPurchaseDto } from '../dto/update-installment-purchase.dto';
import { InstallmentsPurchasesRepository } from 'src/shared/database/repositories/installment-purchases.repositories';
import { InstallmentsRepository } from 'src/shared/database/repositories/installments.repositories';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

@Injectable()
export class InstallmentPurchasesService {
  constructor(
    private readonly installmentPurchasesRepo: InstallmentsPurchasesRepository,
    private readonly installmentsRepo: InstallmentsRepository,
    private readonly transactionsRepo: TransactionsRepository,
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
    } = createInstallmentPurchaseDto;

    const installmentValue = totalValue / numberOfInstallments;

    const installmentPurchase = await this.installmentPurchasesRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        totalValue,
        numberOfInstallments,
        startDate,
      },
    });

    for (let i = 0; i < numberOfInstallments; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      const transaction = await this.transactionsRepo.create({
        data: {
          userId: userId,
          bankAccountId: bankAccountId,
          categoryId,
          name: `${name} - Parcela ${i + 1}`,
          value: installmentValue,
          date: dueDate,
          type: 'EXPENSE',
          isPaid: false,
        },
      });

      await this.installmentsRepo.create({
        data: {
          transactionId: transaction.id,
          installmentPurchaseId: installmentPurchase.id,
          value: installmentValue,
          dueDate: dueDate,
          paid: false,
        },
      });
    }

    return installmentPurchase;
  }

  findAll() {
    return `This action returns all installmentPurchases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} installmentPurchase`;
  }

  update(
    id: number,
    updateInstallmentPurchaseDto: UpdateInstallmentPurchaseDto,
  ) {
    return `This action updates a #${id} installmentPurchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} installmentPurchase`;
  }
}
