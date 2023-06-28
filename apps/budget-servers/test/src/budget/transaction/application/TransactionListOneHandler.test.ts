import { suite, test } from '@testdeck/jest';

import { TransactionFindOneByIdHandler } from '../../../../../src/budget/transactions/application/useCase/findOne/TransactionFindOneById.handler';
import { TransactionFindOneByIdQuery } from '../../../../../src/budget/transactions/application/useCase/findOne/TransactionFindOneById.query';
import { IdMother } from '../../../shared/domain/IdMother';
import { TransactionMother } from '../domain/TransactionMother';
import { TransactionUnitTestCase } from '../TransactionUnitTestCase';

@suite('Transaction list one unit test case')
export class TransactionListOneHandlerTest extends TransactionUnitTestCase {
  private _handler: TransactionFindOneByIdHandler;

  get handler(): TransactionFindOneByIdHandler {
    if (!this._handler) {
      this._handler = new TransactionFindOneByIdHandler(this.service);
    }

    return this._handler;
  }

  @test('should list one transaction')
  async it_should_list_one(): Promise<void> {
    const id = IdMother.random();
    const mockTransaction = TransactionMother.randomWithId(id);
    this.setValueFor('findOneById', mockTransaction);

    const query = new TransactionFindOneByIdQuery(id);
    const transaction = await this.handler.execute(query);
    this.shouldFindOneById(id, transaction);
  }
}
