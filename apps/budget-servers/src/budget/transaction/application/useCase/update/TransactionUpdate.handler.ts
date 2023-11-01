import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { TransactionUpdateCommand } from '@budget/transaction/application/useCase/update/TransactionUpdate.command';

@CommandHandler(TransactionUpdateCommand)
export class TransactionUpdateHandler implements ICommandHandler<TransactionUpdateCommand> {
    constructor(private readonly transactionService: TransactionService) {}

    async execute(command: TransactionUpdateCommand): Promise<void> {
        const { id, inflow, outflow, payee, memo, subCategoryId, date, cleared, accountId, userId } = command;

        await this.transactionService.update(
            id,
            userId,
            inflow,
            outflow,
            payee,
            memo,
            subCategoryId,
            date,
            cleared,
            accountId,
        );
    }
}
