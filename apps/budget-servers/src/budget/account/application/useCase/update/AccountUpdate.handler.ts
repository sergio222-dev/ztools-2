import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AccountService } from '@budget/account/application/service/Account.service';
import { AccountUpdateCommand } from '@budget/account/application/useCase/update/AccountUpdate.command';

@CommandHandler(AccountUpdateCommand)
export class AccountUpdateHandler implements ICommandHandler<AccountUpdateCommand> {
  constructor(private readonly accountService: AccountService) {}

  async execute(command: AccountUpdateCommand): Promise<void> {
    const { id, name } = command;
    await this.accountService.update(id, name);
  }
}
