import { suite, test } from '@testdeck/jest';

import { TransactionDeleteCommand } from '../../../../../src/budget/transactions/application/useCase/delete/TransactionDelete.command';
import { TransactionDeleteHandler } from '../../../../../src/budget/transactions/application/useCase/delete/TransactionDelete.handler';
import { IdMother } from '../../../shared/domain/IdMother';
import { TransactionUnitTestCase } from '../TransactionUnitTestCase';

@suite('Transaction delete unit test case')
export class TransactionDeleteHandlerTest extends TransactionUnitTestCase {
  private _handler: TransactionDeleteHandler;
  get handler(): TransactionDeleteHandler {
    if (!this._handler) {
      this._handler = new TransactionDeleteHandler(this.service);
    }
    return this._handler;
  }

  @test('should delete transaction')
  async it_should_delete_transaction(): Promise<void> {
    const id = IdMother.random();
    const command = new TransactionDeleteCommand(id);

    void this.handler.execute(command);

    this.shouldDelete(id);
  }
}
