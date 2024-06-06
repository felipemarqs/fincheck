import { Module } from '@nestjs/common';
import { InstallmentPurchasesService } from './services/installment-purchases.service';
import { InstallmentPurchasesController } from './installment-purchases.controller';

@Module({
  controllers: [InstallmentPurchasesController],
  providers: [InstallmentPurchasesService],
})
export class InstallmentPurchasesModule {}
