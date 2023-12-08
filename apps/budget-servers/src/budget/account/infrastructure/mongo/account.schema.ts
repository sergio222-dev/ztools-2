import { Schema, Types } from 'mongoose';

import { Account } from '@budget/account/domain/Account.aggregate';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { OwnershipSchema } from '@shared/infrastructure/mongo/OwnershipSchema';

export interface AccountSchemaType extends OwnershipSchema {
  id: string;
  name: string;
  balance: Types.Decimal128;
}

export const AccountSchema = new Schema<AccountSchemaType>(
  {
    _id: {
      type: String,
      required: true,
      default: v => v.id,
    },
    id: {
      type: String,
      index: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  {
    _id: false,
  },
);

export function mapToAccountSchema(account: Account): AccountSchemaType {
  return {
    _id: account.id,
    id: account.id,
    name: account.name,
    balance: new Types.Decimal128(account.balance.amount),
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    userId: account.userId,
  };
}

export function mapToAccountDomain(account: AccountSchemaType): Account {
  return Account.RETRIEVE(
    account._id,
    account.name,
    account.userId,
    new SignedAmount(account.balance.toString()),
    account.createdAt,
    account.updatedAt,
  );
}
