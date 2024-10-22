import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
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
  findAll(@ActiveUserId() userId: string) {
    return this.installmentPurchasesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.installmentPurchasesService.findOne(+id);
  }

  @Put(':installmentPurchaseId')
  update(
    @ActiveUserId() userId: string,
    @Param('installmentPurchaseId', ParseUUIDPipe)
    installmentPurchaseId: string,
    @Body() updateInstallmentPurchaseDto: UpdateInstallmentPurchaseDto,
  ) {
    return this.installmentPurchasesService.update(
      userId,
      installmentPurchaseId,
      updateInstallmentPurchaseDto,
    );
  }
  @Delete(':installmentPurchaseId')
  remove(
    @ActiveUserId() userId: string,
    @Param('installmentPurchaseId') installmentPurchaseId: string,
  ) {
    return this.installmentPurchasesService.remove(
      userId,
      installmentPurchaseId,
    );
  }
}
