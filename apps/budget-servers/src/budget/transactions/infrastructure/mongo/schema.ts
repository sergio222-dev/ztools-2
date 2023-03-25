import mongoose, { HydratedDocument } from 'mongoose';
import { Transaction } from '../../domain/Transaction';

export type TransactionDocument = HydratedDocument<Transaction>;

export const TransactionSchema = new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
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
    required: true,
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
});
