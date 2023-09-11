import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AccountService } from '@budget/account/application/service/Account.service';
import { AccountFindByIdQuery } from '@budget/account/application/useCase/find/AccountFindById.query';
import { Account } from '@budget/account/domain/Account.aggregate';

@QueryHandler(AccountFindByIdQuery)
export class AccountFindByIdHandler implements IQueryHandler<AccountFindByIdQuery> {
  constructor(private readonly accountService: AccountService) {}

  async execute(query: AccountFindByIdQuery): Promise<Account> {
    return this.accountService.findOneById(query.id);
  }
}
