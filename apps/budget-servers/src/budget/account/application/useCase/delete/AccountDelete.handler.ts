import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AccountService } from '@budget/account/application/service/Account.service';
import { AccountDeleteCommand } from '@budget/account/application/useCase/delete/AccountDelete.command';

@CommandHandler(AccountDeleteCommand)
export class AccountDeleteHandler implements ICommandHandler<AccountDeleteCommand> {
    constructor(private readonly accountService: AccountService) {}

    async execute(command: AccountDeleteCommand): Promise<void> {
        const { id, userId } = command;
        await this.accountService.delete(id, userId);
    }
}
