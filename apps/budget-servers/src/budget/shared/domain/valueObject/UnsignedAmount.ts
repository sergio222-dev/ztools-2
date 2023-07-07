import { BigNumber } from 'bignumber.js';

import { Amount } from '@budget/shared/domain/valueObject/Amount';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';

export class UnsignedAmount extends Amount {
  constructor(amount: string | number) {
    if (BigNumber(amount).isNaN()) throw new Error(`${amount} is not a valid number or string`);

    if (BigNumber(amount).isNegative()) throw new Error(`${amount} should not be negative`);

    super(amount);
  }

  minus(other: Amount): Amount {
    const result = super.minus(other);

    if (result.isLessThan(new Amount(0))) {
      return new SignedAmount(result.amount);
    }

    return result;
  }

  negated(): Amount {
    return new SignedAmount(super.negated().amount);
  }
}
