import { forwardRef, Module } from '@nestjs/common';
import { InstallmentPurchasesService } from './services/installment-purchases.service';
import { InstallmentPurchasesController } from './installment-purchases.controller';
import { ValidateInstallmentPurchaseOwnershipService } from './services/validate-installment-purchase-ownership.service';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';

@Module({
  imports: [
    BankAccountsModule,
    CategoriesModule,
    forwardRef(() => TransactionsModule),
    CreditCardsModule,
  ],
  controllers: [InstallmentPurchasesController],
  providers: [
    InstallmentPurchasesService,
    ValidateInstallmentPurchaseOwnershipService,
  ],
  exports: [InstallmentPurchasesService],
})
export class InstallmentPurchasesModule {}
