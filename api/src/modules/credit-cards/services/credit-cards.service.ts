import { Injectable } from '@nestjs/common';

import { CreditCardsRepository } from 'src/shared/database/repositories/credit-cards.repositories';
import { CreateCreditCardDto } from '../dto/create-credit-card.dto';
import { UpdateCreditCardDto } from '../dto/update-credit-card.dto';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCreditCardOwnershipService } from './validate-credit-card-ownership.service';

@Injectable()
export class CreditCardsService {
  constructor(
    private readonly creditCardsRepo: CreditCardsRepository,
    private readonly validadeBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCreditCardOwnershipService: ValidateCreditCardOwnershipService,
  ) {}
  async create(userId: string, createCreditCardDto: CreateCreditCardDto) {
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId: createCreditCardDto.bankAccountId,
    });
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

  async update(
    userId: string,
    creditCardId: string,
    updateCreditCardDto: UpdateCreditCardDto,
  ) {
    await this.validateEntitiesOwnership({
      userId,
      creditCardId,
      bankAccountId: updateCreditCardDto.bankAccountId,
    });
    return await this.creditCardsRepo.update({
      data: { ...updateCreditCardDto },
      where: { id: creditCardId },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} creditCard`;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    creditCardId,
  }: {
    userId: string;
    bankAccountId?: string;
    creditCardId?: string;
  }) {
    await Promise.all([
      creditCardId &&
        this.validateCreditCardOwnershipService.validate(userId, creditCardId),
      bankAccountId &&
        this.validadeBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
    ]);
  }
}
