import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AccountService } from '@budget/account/application/service/Account.service';
import { AccountFindOneByIdQuery } from '@budget/account/application/useCase/find/AccountFindOneById.query';
import { Account } from '@budget/account/domain/Account.aggregate';

@QueryHandler(AccountFindOneByIdQuery)
export class AccountFindOneByIdHandler implements IQueryHandler<AccountFindOneByIdQuery, Account> {
  constructor(private readonly transactionService: AccountService) {}

  async execute(query: AccountFindOneByIdQuery): Promise<Account> {
    return this.transactionService.findOneById(query.id);
  }
}
