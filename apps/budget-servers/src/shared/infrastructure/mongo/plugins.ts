import { BigNumber } from 'bignumber.js';
import { Schema, SchemaType, Types } from 'mongoose';

import { Amount } from '@budget/shared/domain/valueObject/Amount';

export class AmountType extends SchemaType {
  constructor(key, options) {
    super(key, options);
  }

  cast(value: Types.Decimal128 | Amount) {
    console.log(value);
    if (value instanceof Amount) {
      // this.validateNumber(value.amount);
      return new Types.Decimal128(value.amount);
    }

    this.validateNumber(value);

    return new Amount(value.toString());
  }

  private validateNumber(amount: Types.Decimal128) {
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
