import { Controller, Get, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Transaction } from 'mongodb';
import { TransactionFindAllQuery } from '@budget/transactions/application/useCase/find/TransactionFindAll.query';

@Controller('transactions')
@Injectable()
export class TransactionsController {
  constructor(private queryBus: QueryBus) {}

  @Get('all')
  async findAll(): Promise<Transaction[]> {
    return await this.queryBus.execute<TransactionFindAllQuery, Transaction[]>(new TransactionFindAllQuery());
  }
}
