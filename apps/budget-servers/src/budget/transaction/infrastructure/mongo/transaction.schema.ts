import { Mongoose, Schema } from 'mongoose';

import { AmountType } from '../../../../shared/infrastructure/mongo/plugins';
import { ExtendOfDocument } from '../../../../shared/infrastructure/mongo/utils';
import { Transaction } from '../../domain/Transaction.aggregate';

export const TransactionSchema = new Schema<ExtendOfDocument<Transaction>>(
  {
    _id: {
      type: String,
      required: true,
      default: v => v.id,
    },
    id: {
      type: String,
      required: true,
    },
    inflow: {
      type: AmountType,
      required: true,
    },
    outflow: {
      type: AmountType,
      required: true,
    },
    payee: {
      type: String,
      required: true,
    },
    memo: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    subCategoryId: {
      type: String,
    },
    cleared: {
      type: Boolean,
      required: false,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
  },
);
