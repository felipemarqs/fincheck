import { Module } from '@nestjs/common';
import { RecurringTransactionsService } from './services/recurring-transactions.service';
import { RecurringTransactionsController } from './recurring-transactions.controller';
import { ValidadeBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidadeCategoryOwnershipService } from '../categories/services/validade-category-ownership.service';
import { ValidadeTransactionOwnershipService } from '../transactions/services/validade-transaction-ownership.service';

@Module({
  controllers: [RecurringTransactionsController],
  providers: [
    RecurringTransactionsService,
    ValidadeBankAccountOwnershipService,
    ValidadeCategoryOwnershipService,
    ValidadeTransactionOwnershipService,
  ],
  exports: [
    ValidadeBankAccountOwnershipService,
    ValidadeCategoryOwnershipService,
    ValidadeTransactionOwnershipService,
  ],
})
export class RecurringTransactionsModule {}
