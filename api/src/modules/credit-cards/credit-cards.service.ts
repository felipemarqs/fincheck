import { Injectable } from '@nestjs/common';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { CreditCardsRepository } from 'src/shared/database/repositories/credit-cards.repositories';
import { ValidadeBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service';

@Injectable()
export class CreditCardsService {
  constructor(
    private readonly creditCardsRepo: CreditCardsRepository,
    private readonly validadeBankAccountOwnershipService: ValidadeBankAccountOwnershipService,
  ) {}
  async create(userId: string, createCreditCardDto: CreateCreditCardDto) {
    await this.validadeBankAccountOwnershipService.validate(
      userId,
      createCreditCardDto.bankAccountId,
    );
    return await this.creditCardsRepo.create({
      data: {
        userId,
        ...createCreditCardDto,
      },
    });
  }

  findAll() {
    return `This action returns all creditCards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} creditCard`;
  }

  update(id: number, updateCreditCardDto: UpdateCreditCardDto) {
    return `This action updates a #${id} creditCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} creditCard`;
  }
}
