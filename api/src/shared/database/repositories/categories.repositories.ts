import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /* create(createDto: Prisma.UserCreateArgs) {
    return this.prismaService.category.create(createDto);
  } */

  findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findFirst(findFirstDto);
  }
}
