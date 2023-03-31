import { Schema, Document } from 'mongoose';
import { Transaction } from '../../domain/Transaction';

export const TransactionSchema = new Schema<Document<string> & Transaction>(
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
      type: String,
      required: true,
    },
    outflow: {
      type: String,
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
