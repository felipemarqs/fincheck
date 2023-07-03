import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { ValidadeBankAccountOwnershipService } from './services/validate-bank-account-ownership.service';
import { BankAccountsController } from './bank-accounts.controller';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidadeBankAccountOwnershipService],
  exports: [ValidadeBankAccountOwnershipService],
})
export class BankAccountsModule {}
