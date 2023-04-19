import { Transaction } from '../../../domain/Transaction';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransactionFindAllQuery } from './TransactionFindAll.query';
import { TransactionService } from '@budget/transactions/application/services/TransactionService';

@QueryHandler(TransactionFindAllQuery)
export class TransactionFindAllHandler implements IQueryHandler<TransactionFindAllQuery, Transaction[]> {
  constructor(private transactionService: TransactionService) {}
  async execute(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }
}
