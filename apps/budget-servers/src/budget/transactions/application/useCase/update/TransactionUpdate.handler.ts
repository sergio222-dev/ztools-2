import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransactionUpdateCommand } from '@budget/transactions/application/useCase/update/TransactionUpdate.command';
import { TransactionService } from '@budget/transactions/application/services/Transaction.service';
import { Transaction } from '@budget/transactions/domain/Transaction';

@CommandHandler(TransactionUpdateCommand)
export class TransactionUpdateHandler implements ICommandHandler<TransactionUpdateCommand> {
  constructor(private readonly transactionService: TransactionService) {}

  async execute(command: TransactionUpdateCommand): Promise<void> {
    const { id, inflow, outflow, payee, memo, category, date, cleared } = command;
    const transaction = Transaction.CREATE(
      id,
      inflow,
      outflow,
      payee,
      memo,
      category,
      new Date(date),
      cleared,
    );
    await this.transactionService.update(transaction);
  }
}
