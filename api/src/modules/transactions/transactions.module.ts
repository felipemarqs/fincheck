import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';

@Module({
  imports: [BankAccountsModule, CategoriesModule, CreditCardsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateTransactionOwnershipService],
  exports: [ValidateTransactionOwnershipService],
})
export class TransactionsModule {}
