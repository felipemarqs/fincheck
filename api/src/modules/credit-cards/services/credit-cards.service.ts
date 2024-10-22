import { Injectable, NotFoundException } from '@nestjs/common';

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
        availableLimit: createCreditCardDto.limit,
        ...createCreditCardDto,
      },
    });
  }

  async findAll(userId: string) {
    return await this.creditCardsRepo.findMany({
      where: { userId },
      include: {
        bankAccount: { select: { id: true, name: true } },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} creditCard`;
  }

  async updateAvailableLimit(creditCardId: string, value: number) {
    const creditCardFound = await this.creditCardsRepo.findFirst({
      where: { id: creditCardId },
    });

    if (!creditCardFound) {
      throw new NotFoundException('Cartão de crédito não encontrado!');
    }

    await this.creditCardsRepo.update({
      where: { id: creditCardId },
      data: { availableLimit: creditCardFound.availableLimit + value },
    });
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

  async remove(creditCardId: string) {
    await this.creditCardsRepo.delete({ where: { id: creditCardId } });
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
