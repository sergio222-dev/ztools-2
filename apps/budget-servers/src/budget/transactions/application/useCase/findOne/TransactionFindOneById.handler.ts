import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransactionService } from '@budget/transactions/application/services/Transaction.service';
import { TransactionFindOneByIdQuery } from '@budget/transactions/application/useCase/findOne/TransactionFindOneById.query';
import { Transaction } from '@budget/transactions/domain/Transaction';

@QueryHandler(TransactionFindOneByIdQuery)
export class TransactionFindOneByIdHandler
  implements IQueryHandler<TransactionFindOneByIdQuery, Transaction>
{
  constructor(private readonly transactionService: TransactionService) {}

  async execute(query: TransactionFindOneByIdQuery): Promise<Transaction> {
    return this.transactionService.findOneById(query.id);
  }
}
