import { TransactionUpdateHandler } from '../../../../../src/budget/transactions/application/useCase/update/TransactionUpdate.handler';
import { TransactionUnitTestCase } from '../TransactionUnitTestCase';
import { suite, test } from '@testdeck/jest';
import { TransactionUpdateCommandMother } from './TransactionUpdateCommandMother';
import { TransactionMother } from '../domain/TransactionMother';

@suite('Transaction update unit test case')
export class TransactionUpdateHandlerTest extends TransactionUnitTestCase {
  private _handler: TransactionUpdateHandler;

  get handler(): TransactionUpdateHandler {
    if (!this._handler) {
      this._handler = new TransactionUpdateHandler(this.service);
    }

    return this._handler;
  }

  @test('should update transaction')
  async it_should_update_transaction(): Promise<void> {
    const command = TransactionUpdateCommandMother.random();
    const transaction = TransactionMother.fromUpdateCommand(command);

    void this.handler.execute(command);
    this.shouldUpdated(transaction);
  }
}
