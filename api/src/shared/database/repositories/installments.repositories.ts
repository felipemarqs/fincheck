import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InstallmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.InstallmentCreateArgs) {
    return this.prismaService.installment.create(createDto);
  }

  createMany(createManyDto: Prisma.InstallmentCreateManyArgs) {
    return this.prismaService.installment.createMany(createManyDto);
  }

  findMany(findManyDto: Prisma.InstallmentFindManyArgs) {
    return this.prismaService.installment.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.InstallmentFindFirstArgs) {
    return this.prismaService.installment.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.InstallmentUpdateArgs) {
    return this.prismaService.installment.update(updateDto);
  }

  delete(deleteDto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(deleteDto);
  }

  deleteMany(deleteManyDto: Prisma.TransactionDeleteManyArgs) {
    return this.prismaService.transaction.deleteMany(deleteManyDto);
  }
}
