import { IdObject } from '@shared/domain/valueObject/IdObject';

export interface SimpleRepository<T> {
  save(value: T): Promise<T | void>;
  find(id: IdObject): Promise<T | undefined>;
  findAll(userId?: IdObject): Promise<T[]>;
}
