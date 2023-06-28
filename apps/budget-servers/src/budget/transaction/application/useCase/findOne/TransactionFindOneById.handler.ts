import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { TransactionFindOneByIdQuery } from '@budget/transaction/application/useCase/findOne/TransactionFindOneById.query';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

@QueryHandler(TransactionFindOneByIdQuery)
export class TransactionFindOneByIdHandler
  implements IQueryHandler<TransactionFindOneByIdQuery, Transaction>
{
  constructor(private readonly transactionService: TransactionService) {}

  async execute(query: TransactionFindOneByIdQuery): Promise<Transaction> {
    return this.transactionService.findOneById(query.id);
  }
}
