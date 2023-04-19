import { TransactionUpdateCommand } from '../../../../../src/budget/transactions/application/useCase/update/TransactionUpdate.command';
import { IdMother } from '../../../shared/domain/IdMother';
import { MotherCreator } from '../../../shared/domain/MotherCreator';

export class TransactionUpdateCommandMother {
  public static random(): TransactionUpdateCommand {
    return new TransactionUpdateCommand(
      IdMother.random(),
      MotherCreator.random().finance.amount(),
      MotherCreator.random().finance.amount(),
      MotherCreator.random().name.firstName(),
      MotherCreator.random().company.name(),
      MotherCreator.random().date.recent(),
    );
  }
}
