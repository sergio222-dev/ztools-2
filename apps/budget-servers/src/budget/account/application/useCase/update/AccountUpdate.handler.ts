import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AccountService } from '@budget/account/application/service/Account.service';
import { AccountUpdateCommand } from '@budget/account/application/useCase/update/AccountUpdate.command';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';

@CommandHandler(AccountUpdateCommand)
export class AccountUpdateHandler implements ICommandHandler<AccountUpdateCommand> {
  constructor(private readonly accountService: AccountService) {}

  async execute(command: AccountUpdateCommand): Promise<void> {
    const { id, name, userId, balance } = command;
    await this.accountService.update(id, name, userId, new SignedAmount(balance));
  }
}
