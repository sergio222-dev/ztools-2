import { MockProxy, mock } from 'jest-mock-extended';
import { SimpleRepository } from '../../../../src/shared/domain/aggregate/SimpleRepository';
import { AggregateRoot } from '../../../../src/shared/domain/aggregate/AggregateRoot';

export abstract class UnitTestCase<
  E extends AggregateRoot,
  T extends SimpleRepository<E>,
> {
  protected _repository: T & MockProxy<T>;

  get repository(): T & MockProxy<T> {
    if (!this._repository) {
      this._repository = mock<T>();
    }

    return this._repository;
  }

  protected setReturnValueRepository<S extends object>(
    method: keyof T,
    value: S,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.repository[method].mockReturnValue(value);
  }
}
