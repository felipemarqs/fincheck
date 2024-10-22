import {
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCreditCardDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  bankAccountId: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  color: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  limit: number;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  closingDay: number;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  dueDay: number;
}
