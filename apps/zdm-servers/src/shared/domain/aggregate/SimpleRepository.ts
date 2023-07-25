export interface SimpleRepository<T> {
  save(value: T): Promise<T | void>;
}
