import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { ValidadeCategoryOwnershipService } from './services/validade-category-ownership.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidadeCategoryOwnershipService],
  exports: [ValidadeCategoryOwnershipService],
})
export class CategoriesModule {}
