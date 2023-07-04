import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

@Injectable()
export class ValidadeTransactionOwnershipService {
  constructor(private readonly transactionsRepo: TransactionsRepository) {}

  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepo.findFirst({
      where: { userId, id: transactionId },
    });

    if (!isOwner) {
      throw new NotFoundException('Transaction Not Found');
    }
  }
}
