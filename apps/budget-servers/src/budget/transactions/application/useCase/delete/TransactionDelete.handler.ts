import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransactionDeleteCommand } from '@budget/transactions/application/useCase/delete/TransactionDelete.command';
import { TransactionService } from '@budget/transactions/application/services/TransactionService';

@CommandHandler(TransactionDeleteCommand)
export class TransactionDeleteHandler implements ICommandHandler<TransactionDeleteCommand> {
  constructor(private readonly transactionService: TransactionService) {}

  async execute(command: TransactionDeleteCommand): Promise<void> {
    const { id } = command;
    await this.transactionService.deleteOneById(id);
  }
}
