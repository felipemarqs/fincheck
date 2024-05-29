import { Controller, Post, Body } from '@nestjs/common';
import { RecurringTransactionsService } from './services/recurring-transactions.service';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transation.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('recurring-transactions')
export class RecurringTransactionsController {
  constructor(
    private readonly recurringTransactionsService: RecurringTransactionsService,
  ) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createRecurringTransactionDto: CreateRecurringTransactionDto,
  ) {
    return this.recurringTransactionsService.create(
      userId,
      createRecurringTransactionDto,
    );
  }
}
