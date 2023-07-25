export class ValueObject<T> {
  protected readonly _value: T;

  get value(): T {
    return this._value;
  }

  constructor(value: T) {
    this._value = value;
  }
}