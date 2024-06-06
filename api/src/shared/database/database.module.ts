import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { TransactionsRepository } from './repositories/transactions.repositories';
import { RecurringTransactionsRepository } from './repositories/recurring-transactions.repositories';
import { InstallmentsPurchasesRepository } from './repositories/installment-purchases.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
    RecurringTransactionsRepository,
    InstallmentsPurchasesRepository
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
    RecurringTransactionsRepository,
    InstallmentsPurchasesRepository
  ],
})
export class DatabaseModule {}
