import { Transaction } from '../../../domain/Transaction';
import { TransactionAll } from './TransactionAll';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransactionFindAllQuery } from './TransactionFindAll.query';

@QueryHandler(TransactionFindAllQuery)
export class TransactionFindAllHandler implements IQueryHandler<TransactionFindAllQuery, Transaction[]> {
  constructor(private transactionService: TransactionAll) {}
  async execute(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }
}
