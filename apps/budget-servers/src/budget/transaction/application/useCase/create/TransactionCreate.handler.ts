import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { TransactionCreateCommand } from '@budget/transaction/application/useCase/create/TransactionCreate.command';

@CommandHandler(TransactionCreateCommand)
export class TransactionCreateHandler implements ICommandHandler<TransactionCreateCommand> {
    constructor(private transactionService: TransactionService) {}

    async execute(command: TransactionCreateCommand): Promise<void> {
        const { id, inflow, outflow, payee, memo, subCategoryId, date, cleared, accountId, userId } = command;
        const inflowMoney = new UnsignedAmount(inflow);
        const outflowMoney = new UnsignedAmount(outflow);

        await this.transactionService.createOne(
            id,
            inflowMoney,
            outflowMoney,
            payee,
            memo,
            subCategoryId,
            new Date(date),
            cleared,
            accountId,
            userId,
        );
    }
}
