import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { TransactionDeleteBatchCommand } from '@budget/transaction/application/useCase/deleteBatch/TransactionDeleteBatch.command';

@CommandHandler(TransactionDeleteBatchCommand)
export class TransactionDeleteBatchHandler implements ICommandHandler<TransactionDeleteBatchCommand> {
  constructor(private readonly transactionService: TransactionService) {}

  async execute(command: TransactionDeleteBatchCommand): Promise<void> {
    const { ids } = command;
    await this.transactionService.deleteBatch(ids);
  }
}
