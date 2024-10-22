import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RecurrenceType } from '@prisma/client';
import { TransactionType } from '../entities/Transaction';

export class CreateRecurringTransactionDto {
  @IsString()
  bankAccountId: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  creditCardId: string;

  @IsString()
  name: string;

  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  endDate?: Date;

  @IsEnum(RecurrenceType)
  recurrence: RecurrenceType;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  @IsString()
  type: TransactionType;
}
