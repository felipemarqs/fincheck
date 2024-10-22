import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreditCardsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CreditCardCreateArgs) {
    return this.prismaService.creditCard.create(createDto);
  }

  findMany(findManyDto: Prisma.CreditCardFindManyArgs) {
    return this.prismaService.creditCard.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.CreditCardFindFirstArgs) {
    return this.prismaService.creditCard.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.CreditCardUpdateArgs) {
    return this.prismaService.creditCard.update(updateDto);
  }

  delete(deleteDto: Prisma.CreditCardDeleteArgs) {
    return this.prismaService.creditCard.delete(deleteDto);
  }
}
