import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidadeBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service';

import { ValidadeCategoryOwnershipService } from '../categories/services/validade-category-ownership.service';
import { promises } from 'dns';
@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validadeBankAccountOwnershipService: ValidadeBankAccountOwnershipService,
    private readonly validadeCategoryOwnershipService: ValidadeCategoryOwnershipService,
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

  findAllByUserId(userId: string) {
    return this.transactionsRepo.findMany({
      where: { userId },
    });
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
  }: {
    userId: string;
    bankAccountId: string;
    categoryId: string;
  }) {
    await Promise.all([
      //Validando se o ID da conta bancária pertence ao usuário
      this.validadeBankAccountOwnershipService.validate(userId, bankAccountId),
      //Validando se o ID da categoria pertence ao usuário
      this.validadeCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
