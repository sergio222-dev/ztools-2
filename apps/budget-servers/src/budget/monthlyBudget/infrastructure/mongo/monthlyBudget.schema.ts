import { Schema } from 'mongoose';

import { ExtendOfDocument } from '@shared/infrastructure/mongo/utils';
import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { AmountType } from '@shared/infrastructure/mongo/plugins';

export const MonthlyBudgetSchema = new Schema<ExtendOfDocument<MonthlyBudget>>(
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
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    subCategoryId: {
      type: String,
      required: true,
      ref: 'SubCategory',
    },
    assigned: {
      type: AmountType,
      required: true,
    },
    activity: {
      type: AmountType,
      required: true,
    },
    available: {
      type: AmountType,
      required: true,
    },
  },
  {
    _id: false,
  },
);

MonthlyBudgetSchema.index({ year: 1, month: 1, subCategoryId: 1 }, { unique: true });
