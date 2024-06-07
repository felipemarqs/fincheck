import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { TransactionsRepository } from './repositories/transactions.repositories';
import { RecurringTransactionsRepository } from './repositories/recurring-transactions.repositories';
import { InstallmentsPurchasesRepository } from './repositories/installment-purchases.repositories';
import { InstallmentsRepository } from './repositories/installments.repositories';
import { CreditCardsRepository } from './repositories/credit-cards.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
    InstallmentsRepository,
    RecurringTransactionsRepository,
    InstallmentsPurchasesRepository,
    CreditCardsRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
    InstallmentsRepository,
    RecurringTransactionsRepository,
    InstallmentsPurchasesRepository,
    CreditCardsRepository,
  ],
})
export class DatabaseModule {}
