import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AccountService } from '@budget/account/application/service/Account.service';
import { AccountCreateCommand } from '@budget/account/application/useCase/create/AccountCreate.command';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';

@CommandHandler(AccountCreateCommand)
export class AccountCreateHandler implements ICommandHandler<AccountCreateCommand> {
  constructor(private readonly accountService: AccountService) {}

  async execute(command: AccountCreateCommand): Promise<void> {
    const { id, name, userId, balance } = command;

    await this.accountService.createOne(id, name, new SignedAmount(balance), userId);
  }
}
