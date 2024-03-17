import { BigNumber } from 'bignumber.js';
import { Schema, SchemaType, Types } from 'mongoose';

import { Amount } from '@budget/shared/domain/valueObject/Amount';

export class AmountType extends SchemaType {
  constructor(key, options) {
    super(key, options);
  }

  cast(value: Types.Decimal128 | Amount) {
    console.log(`[QXC] type`, typeof value);
    console.log('[QXC] instance of value', this.isInstanceOfAmount(value));
    if (this.isInstanceOfAmount(value)) {
      // this.validateNumber(value.amount);
      console.log('converting to decimal128', value.amount);
      return new Types.Decimal128(value.amount);
    }

    this.validateNumber(value);

    return new Amount(value.toString());
  }

  private isInstanceOfAmount(value: any): value is Amount {
    return value.amount !== undefined;
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

export function initializeAmountType() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Types.AmountType = Schema.Types.AmountType = AmountType;
  console.log(`[QXC] custom schema type added`);
}
