import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validadeBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, color, initialBalance, type } = createBankAccountDto;

    const bankAccountNameExists = await this.bankAccountsRepo.findFirst({
      where: { userId, name },
    });

    if (bankAccountNameExists) {
      throw new ConflictException('Bank Account Name Already Exists!');
    }

    const bankAccount = await this.bankAccountsRepo.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      },
    });

    return bankAccount;
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
            isPaid: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'INCOME' && transaction.isPaid) {
          return acc + transaction.value;
        }

        if (transaction.type === 'EXPENSE' && transaction.isPaid) {
          return acc + -transaction.value;
        }

        return acc;
      }, 0);
      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        totalTransactions,
        ...bankAccount,
        currentBalance,
      };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validadeBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    const { name, color, initialBalance, type } = updateBankAccountDto;

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: { name, color, initialBalance, type },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validadeBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    });

    return null;
  }
}
