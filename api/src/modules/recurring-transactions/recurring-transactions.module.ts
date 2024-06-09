import { Module } from '@nestjs/common';
import { RecurringTransactionsService } from './services/recurring-transactions.service';
import { RecurringTransactionsController } from './recurring-transactions.controller';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from '../transactions/services/validate-transaction-ownership.service';
import { ValidateCreditCardOwnershipService } from '../credit-cards/services/validate-credit-card-ownership.service';

@Module({
  controllers: [RecurringTransactionsController],
  providers: [
    RecurringTransactionsService,
    ValidateBankAccountOwnershipService,
    ValidateCategoryOwnershipService,
    ValidateTransactionOwnershipService,
    ValidateCreditCardOwnershipService,
  ],
  exports: [
    ValidateBankAccountOwnershipService,
    ValidateCategoryOwnershipService,
    ValidateTransactionOwnershipService,
    ValidateCreditCardOwnershipService,
  ],
})
export class RecurringTransactionsModule {}
