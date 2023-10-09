import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { TransactionFindAllBySubCategoryIdQuery } from '@budget/transaction/application/useCase/find/TransactionFindAllBySubCategoryId.query';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

@QueryHandler(TransactionFindAllBySubCategoryIdQuery)
export class TransactionFindAllBySubCategoryIdHandler
  implements IQueryHandler<TransactionFindAllBySubCategoryIdQuery>
{
  constructor(private readonly transactionService: TransactionService) {}

  async execute(query: TransactionFindAllBySubCategoryIdQuery): Promise<Transaction[]> {
    return this.transactionService.findAllBySubCategoryId(query.subCategoryId, query.userId);
  }
}
