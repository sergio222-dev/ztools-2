import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AccountService } from '@budget/account/application/service/Account.service';
import { AccountFindAllQuery } from '@budget/account/application/useCase/find/AccountFindAll.query';
import { Account } from '@budget/account/domain/Account.aggregate';

@QueryHandler(AccountFindAllQuery)
export class AccountFindAllHandler implements IQueryHandler {
  constructor(private readonly accountService: AccountService) {}

  async execute(): Promise<Account[]> {
    return await this.accountService.findAll();
  }
}
