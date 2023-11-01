import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { TransactionFindAllByAccountQuery } from '@budget/transaction/application/useCase/find/TransactionFindAllByAccount.query';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

@QueryHandler(TransactionFindAllByAccountQuery)
export class TransactionFindAllByAccountHandler implements IQueryHandler<TransactionFindAllByAccountQuery> {
    constructor(private readonly transactionService: TransactionService) {}

    async execute(query: TransactionFindAllByAccountQuery): Promise<Transaction[]> {
        return this.transactionService.findAllByAccountId(query.accountId, query.userId);
    }
}
