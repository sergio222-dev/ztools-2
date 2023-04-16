import { TransactionUnitTestCase } from '../TransactionUnitTestCase';
import { suite, test } from '@testdeck/jest';
import { TransactionFindAllHandler } from '../../../../../src/budget/transactions/application/useCase/find/TransactionFindAll.handler';

@suite('Transaction list all unit test case')
export class TransactionListAllHandlerTest extends TransactionUnitTestCase {
  private _handler: TransactionFindAllHandler;

  get handler(): TransactionFindAllHandler {
    if (!this._handler) {
      this._handler = new TransactionFindAllHandler(this.service);
    }

    return this._handler;
  }

  @test('should list all transactions')
  it_should_list_all(): void {
    void this.handler.execute();
    this.shouldListAll();
  }
}
