import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateInstallmentPurchaseDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  totalValue: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  numberOfInstallments: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;
}
