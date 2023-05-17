import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransactionDeleteBatchCommand } from '@budget/transactions/application/useCase/deleteBatch/TransactionDeleteBatch.command';
import { TransactionService } from '@budget/transactions/application/services/Transaction.service';

@CommandHandler(TransactionDeleteBatchCommand)
export class TransactionDeleteBatchHandler implements ICommandHandler<TransactionDeleteBatchCommand> {
  constructor(private readonly transactionService: TransactionService) {}

  async execute(command: TransactionDeleteBatchCommand): Promise<void> {
    const { ids } = command;
    await this.transactionService.deleteBatch(ids);
  }
}
