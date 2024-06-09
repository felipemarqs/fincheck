import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreditCardsRepository } from 'src/shared/database/repositories/credit-cards.repositories';

@Injectable()
export class ValidateCreditCardOwnershipService {
  constructor(private readonly creditCardsRepo: CreditCardsRepository) {}

  async validate(userId: string, creditCardId: string) {
    const isOwner = await this.creditCardsRepo.findFirst({
      where: { userId, id: creditCardId },
    });

    if (!isOwner) {
      throw new NotFoundException('Cartão de crédito não encontrado!');
    }
  }
}
