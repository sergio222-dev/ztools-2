import { suite, test } from '@testdeck/jest';

import { TransactionCreateCommandMother } from './TransactionCreateCommandMother';
import { TransactionCreateHandler } from '../../../../../src/budget/transactions/application/useCase/create/TransactionCreate.handler';
import { TransactionMother } from '../domain/TransactionMother';
import { TransactionUnitTestCase } from '../TransactionUnitTestCase';

@suite('Transaction create unit test case')
export class TransactionCreateHandlerTest extends TransactionUnitTestCase {
  private _handler: TransactionCreateHandler;

  get handler(): TransactionCreateHandler {
    if (!this._handler) {
      this._handler = new TransactionCreateHandler(this.service);
    }

    return this._handler;
  }

  @test('should create transaction')
  async it_should_create_transaction(): Promise<void> {
    const command = TransactionCreateCommandMother.random();
    const transaction = TransactionMother.fromCreateCommand(command);

    void this.handler.execute(command);
    this.shouldSaved(transaction);
  }

  @test('should create with empty clreaded flag')
  async it_should_create_transaction_with_cleared_flag(): Promise<void> {
    const command = TransactionCreateCommandMother.randomWithoutCleared();
    const transaction = TransactionMother.fromCreateCommand(command);

    void this.handler.execute(command);
    this.shouldSaved(transaction);
  }
}
