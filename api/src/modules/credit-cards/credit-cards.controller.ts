import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreditCardsService } from './services/credit-cards.service';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createCreditCardDto: CreateCreditCardDto,
  ) {
    return this.creditCardsService.create(userId, createCreditCardDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.creditCardsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditCardsService.findOne(+id);
  }

  @Put(':creditCardId')
  update(
    @ActiveUserId() userId: string,
    @Param('creditCardId') creditCardId: string,
    @Body() updateCreditCardDto: UpdateCreditCardDto,
  ) {
    return this.creditCardsService.update(
      userId,
      creditCardId,
      updateCreditCardDto,
    );
  }

  @Delete(':creditCardId')
  remove(@Param('creditCardId') creditCardId: string) {
    return this.creditCardsService.remove(creditCardId);
  }
}
