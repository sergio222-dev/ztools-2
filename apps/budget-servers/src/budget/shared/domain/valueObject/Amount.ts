import { BigNumber } from 'bignumber.js';

export class Amount {
  static ZeroValue = new Amount(0);

  protected readonly _amount: BigNumber;
  constructor(amount: string | number) {
    this._amount = new BigNumber(amount);
  }

  get amount(): string {
    return this._amount.toString();
  }

  isPositive(): boolean {
    return this._amount.isPositive();
  }

  isNegative(): boolean {
    return this._amount.isNegative();
  }

  isGreaterThan(other: Amount): boolean {
    return this._amount.isGreaterThan(new BigNumber(other.amount));
  }

  isLessThan(other: Amount): boolean {
    return this._amount.isLessThan(new BigNumber(other.amount));
  }

  isEqualTo(other: Amount): boolean {
    return this._amount.isEqualTo(new BigNumber(other.amount));
  }

  plus(other: Amount): Amount {
    const bigNumberAmount = new BigNumber(other.amount);
    const newAmount = this._amount.plus(bigNumberAmount);
    return new Amount(newAmount.toString());
  }

  minus(other: Amount): Amount {
    const bigNumberAmount = new BigNumber(other.amount);
    const newAmount = this._amount.minus(bigNumberAmount);
    return new Amount(newAmount.toString());
  }

  negated(): Amount {
    return new Amount(this._amount.negated().toString());
  }
}
