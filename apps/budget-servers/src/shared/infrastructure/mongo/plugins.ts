import { BigNumber } from 'bignumber.js';
import { Schema, SchemaType } from 'mongoose';

import { Amount } from '@budget/shared/domain/valueObject/Amount';

export class AmountType extends SchemaType {
  constructor(key, options) {
    super(key, options);
  }

  cast(value) {
    if (value instanceof Amount) {
      this.validateNumber(value.amount);
      return BigNumber(value.amount).toString();
    }

    this.validateNumber(value);

    return new Amount(value);
  }

  private validateNumber(amount) {
    if (typeof amount !== 'string') {
      throw new TypeError(`${amount} is not a string`);
    }

    if (BigNumber(amount).isNaN()) {
      throw new TypeError(`${amount} is not a valid number`);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Schema.Types.AmountType = AmountType;
