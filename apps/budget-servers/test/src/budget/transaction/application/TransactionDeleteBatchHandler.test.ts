import { TransactionUnitTestCase } from '../TransactionUnitTestCase';
import { TransactionDeleteBatchHandler } from '../../../../../src/budget/transactions/application/useCase/deleteBatch/TransactionDeleteBatch.handler';
import { suite, test } from '@testdeck/jest';
import { IdMother } from '../../../shared/domain/IdMother';
import { TransactionDeleteBatchCommand } from '../../../../../src/budget/transactions/application/useCase/deleteBatch/TransactionDeleteBatch.command';

@suite()
export class TransactionDeleteBatchHandlerTest extends TransactionUnitTestCase {
  private _handler: TransactionDeleteBatchHandler;
  get handler(): TransactionDeleteBatchHandler {
    if (!this._handler) {
      this._handler = new TransactionDeleteBatchHandler(this.service);
    }
    return this._handler;
  }

  @test('should delete several transaction in batch')
  async it_should_delete_batch(): Promise<void> {
    const ids = IdMother.randomCollection(10);
    const command = new TransactionDeleteBatchCommand(ids);

    void this.handler.execute(command);
    this.shouldDeleteBatch(ids);
  }
}
