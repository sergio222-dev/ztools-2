import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { TransactionDeleteCommand } from '@budget/transaction/application/useCase/delete/TransactionDelete.command';

@CommandHandler(TransactionDeleteCommand)
export class TransactionDeleteHandler implements ICommandHandler<TransactionDeleteCommand> {
  constructor(private readonly transactionService: TransactionService) {}

  async execute(command: TransactionDeleteCommand): Promise<void> {
    const { id } = command;
    await this.transactionService.deleteOneById(id);
  }
}
