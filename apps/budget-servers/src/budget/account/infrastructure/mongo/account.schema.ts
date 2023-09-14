import { Schema } from 'mongoose';

import { Account } from '@budget/account/domain/Account.aggregate';
import { ExtendOfDocument } from '@shared/infrastructure/mongo/utils';

export const AccountSchema = new Schema<ExtendOfDocument<Account>>(
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
  },
  {
    _id: false,
  },
);
