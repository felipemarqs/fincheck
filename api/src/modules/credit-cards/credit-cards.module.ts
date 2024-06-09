import { Module } from '@nestjs/common';

import { CreditCardsController } from './credit-cards.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CreditCardsService } from './services/credit-cards.service';
import { ValidateCreditCardOwnershipService } from './services/validate-credit-card-ownership.service';

@Module({
  imports: [BankAccountsModule],
  controllers: [CreditCardsController],
  providers: [CreditCardsService, ValidateCreditCardOwnershipService],
  exports: [ValidateCreditCardOwnershipService],
})
export class CreditCardsModule {}
