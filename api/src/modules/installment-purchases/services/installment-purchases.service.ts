import { Injectable } from '@nestjs/common';
import { CreateInstallmentPurchaseDto } from '../dto/create-installment-purchase.dto';
import { UpdateInstallmentPurchaseDto } from '../dto/update-installment-purchase.dto';
import { InstallmentsPurchasesRepository } from 'src/shared/database/repositories/installment-purchases.repositories';

@Injectable()
export class InstallmentPurchasesService {
  constructor(
    private readonly installmentPurchasesRepo: InstallmentsPurchasesRepository,
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

    

 
    return await this.installmentPurchasesRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        totalValue,
        numberOfInstallments,
        startDate
      },
    });
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
