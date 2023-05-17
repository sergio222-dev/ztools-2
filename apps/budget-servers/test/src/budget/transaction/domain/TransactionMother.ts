import { Transaction } from '../../../../../src/budget/transactions/domain/Transaction';
import { MotherCreator } from '../../../shared/domain/MotherCreator';
import { TransactionCreateCommand } from '../../../../../src/budget/transactions/application/useCase/create/TransactionCreate.command';
import { TransactionUpdateCommand } from '../../../../../src/budget/transactions/application/useCase/update/TransactionUpdate.command';

export class TransactionMother {
  public static create(
    id: string,
    inflow: string,
    outflow: string,
    payee: string,
    memo: string,
    category: string,
    date: Date,
    cleared: boolean,
  ): Transaction {
    return Transaction.CREATE(id, inflow, outflow, payee, memo, category, date, cleared);
  }

  public static randomWithId(id: string): Transaction {
    return Transaction.CREATE(
      id,
      MotherCreator.random().finance.amount(),
      MotherCreator.random().finance.amount(),
      MotherCreator.random().name.firstName(),
      MotherCreator.random().company.name(),
      MotherCreator.random().commerce.department(),
      MotherCreator.random().date.recent(),
      MotherCreator.random().datatype.boolean(),
    );
  }

  public static fromCreateCommand(command: TransactionCreateCommand): Transaction {
    return Transaction.CREATE(
      command.id,
      command.inflow,
      command.outflow,
      command.payee,
      command.memo,
      command.category,
      command.date,
      command.cleared,
    );
  }

  public static fromUpdateCommand(command: TransactionUpdateCommand): Transaction {
    return Transaction.CREATE(
      command.id,
      command.inflow,
      command.outflow,
      command.payee,
      command.memo,
      command.category,
      command.date,
      command.cleared,
    );
  }
}
