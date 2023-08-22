export abstract class ValueObject<T> {
  get value(): T {
    return this._value
  }

  constructor(
    protected readonly _value: T
  ) {}
}
