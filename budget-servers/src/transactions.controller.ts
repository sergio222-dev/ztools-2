import { Controller, Get } from '@nestjs/common';
import { Transaction } from './transactions/domain/Transaction';
import { TransactionAllHandler } from './transactions/application/useCase/all/TransactionAllHandler';

@Controller('transactions')
export class TransactionsController {
  @Get('all')
  async getHello(): Promise<Transaction[]> {
    const handler = new TransactionAllHandler();

    return await handler.execute();
  }
}
