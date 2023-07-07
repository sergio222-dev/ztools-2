import { MockProxy } from 'jest-mock-extended';

import { TransactionService } from '../../../../src/budget/transactions/application/services/Transaction.service';
import { TransactionAggregate } from '../../../../src/budget/transactions/domain/Transaction.aggregate';
import { TransactionRepository } from '../../../../src/budget/transactions/domain/Transaction.repository';
import { UnitTestCase } from '../../shared/infrastructure/UnitTestCase';

import '../../shared/domain/TestUtils';
import { expect } from '@jest/globals';

export abstract class TransactionUnitTestCase extends UnitTestCase {
  private _repository: TransactionRepository;
  private _service: TransactionService;

  get repository(): TransactionRepository {
    if (!this._repository) {
      this._repository = this.mock<TransactionRepository>();
    }

    return this._repository;
  }

  get service(): TransactionService {
    if (!this._service) {
      this._service = new TransactionService(this.repository);
    }

    return this._service;
  }

  protected setValueFor(method: keyof TransactionRepository, value: TransactionAggregate): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (this.repository[method] as unknown as MockProxy<TransactionRepository>).mockReturnValue(value);
  }

  protected shouldListAll(): void {
    expect(this.repository.findAll).toBeCalledTimes(1);
  }

  protected shouldFindOneById(id: string, transaction: TransactionAggregate): void {
    expect(this.repository.findOneById).toBeCalledTimes(1);
    expect(this.repository.findOneById).toBeCalledWith(id);
    expect(this.repository.findOneById).toHaveReturnedWith(transaction);
  }

  protected shouldSaved(transaction: TransactionAggregate): void {
    expect(this.repository.save).toBeCalledTimes(1);
    expect(this.repository.save).toBeCalledWithAndWithoutKeys(transaction, ['updatedAt', 'createdAt']);
  }

  protected shouldUpdated(transaction: TransactionAggregate): void {
    expect(this.repository.update).toBeCalledTimes(1);
    // expect(this.repository.update).toBeCalledWith(transaction);
    expect(this.repository.update).toBeCalledWithAndWithoutKeys(transaction, ['updatedAt', 'createdAt']);
  }

  protected shouldDelete(id: string): void {
    expect(this.repository.delete).toBeCalledTimes(1);
    expect(this.repository.delete).toBeCalledWith(id);
  }

  protected shouldDeleteBatch(ids: string[]): void {
    expect(this.repository.deleteBatch).toBeCalledTimes(1);
    expect(this.repository.deleteBatch).toBeCalledWith(ids);
  }
}
