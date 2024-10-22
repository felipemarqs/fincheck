import { Injectable, NotFoundException } from '@nestjs/common';

import { RecurringTransactionsRepository } from 'src/shared/database/repositories/recurring-transactions.repositories';

@Injectable()
export class ValidateRecuringTransactionOwnershipService {
  constructor(
    private readonly recurringTransactionsRepo: RecurringTransactionsRepository,
  ) {}

  async validate(userId: string, recurringTransactionId: string) {
    const isOwner = await this.recurringTransactionsRepo.findFirst({
      where: { userId, id: recurringTransactionId },
    });

    if (!isOwner) {
      throw new NotFoundException('Transação recorrente não encontrada!');
    }
  }
}
