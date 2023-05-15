import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransactionCreateCommand } from '@budget/transactions/application/useCase/create/TransactionCreate.command';
import { Transaction } from '@budget/transactions/domain/Transaction';
import { TransactionService } from '@budget/transactions/application/services/Transaction.service';

@CommandHandler(TransactionCreateCommand)
export class TransactionCreateHandler implements ICommandHandler<TransactionCreateCommand> {
  constructor(private transactionService: TransactionService) {}

  async execute(command: TransactionCreateCommand): Promise<void> {
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
    await this.transactionService.createOne(transaction);
  }
}
