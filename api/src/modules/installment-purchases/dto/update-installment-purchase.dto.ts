import { PartialType } from '@nestjs/mapped-types';
import { CreateInstallmentPurchaseDto } from './create-installment-purchase.dto';

export class UpdateInstallmentPurchaseDto extends PartialType(CreateInstallmentPurchaseDto) {}
