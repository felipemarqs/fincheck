import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstallmentPurchasesService } from './services/installment-purchases.service';
import { CreateInstallmentPurchaseDto } from './dto/create-installment-purchase.dto';
import { UpdateInstallmentPurchaseDto } from './dto/update-installment-purchase.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('installment-purchases')
export class InstallmentPurchasesController {
  constructor(
    private readonly installmentPurchasesService: InstallmentPurchasesService,
  ) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createInstallmentPurchaseDto: CreateInstallmentPurchaseDto,
  ) {
    return this.installmentPurchasesService.create(
      userId,
      createInstallmentPurchaseDto,
    );
  }

  @Get()
  findAll() {
    return this.installmentPurchasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.installmentPurchasesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstallmentPurchaseDto: UpdateInstallmentPurchaseDto,
  ) {
    return this.installmentPurchasesService.update(
      +id,
      updateInstallmentPurchaseDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.installmentPurchasesService.remove(+id);
  }
}
