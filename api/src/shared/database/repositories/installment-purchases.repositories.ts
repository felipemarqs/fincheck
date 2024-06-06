import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InstallmentsPurchasesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.InstallmentPurchaseCreateArgs) {
    return this.prismaService.installmentPurchase.create(createDto);
  }

  findMany(findManyDto: Prisma.InstallmentPurchaseFindManyArgs) {
    return this.prismaService.installmentPurchase.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.InstallmentPurchaseFindFirstArgs) {
    return this.prismaService.installmentPurchase.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.InstallmentPurchaseUpdateArgs) {
    return this.prismaService.installmentPurchase.update(updateDto);
  }

  delete(deleteDto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(deleteDto);
  }
}
