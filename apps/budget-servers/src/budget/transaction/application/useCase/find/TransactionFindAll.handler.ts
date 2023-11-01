import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TransactionFindAllQuery } from './TransactionFindAll.query';
import { Transaction } from '../../../domain/Transaction.aggregate';
import { TransactionService } from '@budget/transaction/application/services/Transaction.service';

@QueryHandler(TransactionFindAllQuery)
export class TransactionFindAllHandler implements IQueryHandler<TransactionFindAllQuery, Transaction[]> {
    constructor(private transactionService: TransactionService) {}
    async execute(query: TransactionFindAllQuery): Promise<Transaction[]> {
        return this.transactionService.findAll(query.userId);
    }
}
