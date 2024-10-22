import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  IsNumber,
  IsDateString,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { TransactionType } from '../entities/Transaction';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  creditCardId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  @IsString()
  type: TransactionType;

  @IsBoolean()
  isPaid: boolean;
}
