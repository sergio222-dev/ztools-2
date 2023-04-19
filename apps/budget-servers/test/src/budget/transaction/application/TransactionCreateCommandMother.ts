import { TransactionCreateCommand } from '../../../../../src/budget/transactions/application/useCase/create/TransactionCreate.command';
import { IdMother } from '../../../shared/domain/IdMother';
import { MotherCreator } from '../../../shared/domain/MotherCreator';

export class TransactionCreateCommandMother {
  public static random(): TransactionCreateCommand {
    return new TransactionCreateCommand(
      IdMother.random(),
      MotherCreator.random().finance.amount(),
      MotherCreator.random().finance.amount(),
      MotherCreator.random().name.firstName(),
      MotherCreator.random().company.name(),
      MotherCreator.random().date.recent(),
    );
  }
}
