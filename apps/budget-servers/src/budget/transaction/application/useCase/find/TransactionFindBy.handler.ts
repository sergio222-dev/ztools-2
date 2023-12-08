import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { TransactionFindByQuery } from '@budget/transaction/application/useCase/find/TransactionFindBy.query';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(TransactionFindByQuery)
export class TransactionFindByHandler implements IQueryHandler<TransactionFindByQuery, Transaction[]> {
  constructor(private readonly transactionService: TransactionService) {}

  async execute(query: TransactionFindByQuery): Promise<Transaction[]> {
    return this.transactionService.findAllBy(query.userId, query.page, query.limit, query.accountIds);
  }
}
