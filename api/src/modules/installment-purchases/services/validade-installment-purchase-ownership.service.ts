import { Injectable, NotFoundException } from '@nestjs/common';

import { InstallmentsPurchasesRepository } from 'src/shared/database/repositories/installment-purchases.repositories';

@Injectable()
export class ValidadeInstallmentPurchaseOwnershipService {
  constructor(
    private readonly installmentPurchasesRepo: InstallmentsPurchasesRepository,
  ) {}

  async validate(userId: string, installmentPurchaseId: string) {
    const isOwner = await this.installmentPurchasesRepo.findFirst({
      where: { userId, id: installmentPurchaseId },
    });

    if (!isOwner) {
      throw new NotFoundException('Installment Not Found');
    }
  }
}
