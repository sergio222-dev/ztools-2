import { BigNumber } from 'bignumber.js';

import { Amount } from '@budget/shared/domain/valueObject/Amount';

export class SignedAmount extends Amount {
  constructor(amount: string | number) {
    if (BigNumber(amount).isNaN()) throw new Error(`${amount} is not a valid number or string`);
    super(amount);
  }

  negated(): Amount {
    return new SignedAmount(super.negated().amount);
  }
}
