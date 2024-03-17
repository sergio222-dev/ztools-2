import { Schema, Types } from 'mongoose';

import { Transaction } from '../../domain/Transaction.aggregate';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { OwnershipSchema } from '@shared/infrastructure/mongo/OwnershipSchema';
import { initializeAmountType } from '@shared/infrastructure/mongo/plugins';

export interface TransactionSchemaType extends OwnershipSchema {
  inflow: Types.Decimal128;
  outflow: Types.Decimal128;
  payee: string;
  memo: string;
  date: Date;
  subCategoryId: string;
  cleared: boolean;
  accountId: string;
}

initializeAmountType();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const TransactionSchema = new Schema<TransactionSchemaType>(
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
      type: Schema.Types.Decimal128,
      required: true,
    },
    outflow: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    payee: {
      type: String,
      required: false,
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
      required: true,
    },
    cleared: {
      type: Boolean,
      required: false,
    },
    accountId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
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

export function mapToSchema(entity: Transaction): TransactionSchemaType {
  console.log('[QXC] converting to schema');
  return {
    id: entity.id,
    _id: entity.id,
    userId: entity.userId,
    inflow: new Types.Decimal128(entity.inflow.amount),
    outflow: new Types.Decimal128(entity.outflow.amount),
    accountId: entity.accountId,
    payee: entity.payee,
    memo: entity.memo,
    date: entity.date,
    subCategoryId: entity.subCategoryId,
    cleared: entity.cleared,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

export function mapToDomain(document: TransactionSchemaType): Transaction {
  return Transaction.RETRIEVE(
    document.id,
    new UnsignedAmount(document.inflow.toString()),
    new UnsignedAmount(document.outflow.toString()),
    document.payee,
    document.memo,
    document.subCategoryId,
    new Date(document.date),
    document.cleared,
    document.accountId,
    document.userId,
    document.createdAt,
    document.updatedAt,
  );
}
