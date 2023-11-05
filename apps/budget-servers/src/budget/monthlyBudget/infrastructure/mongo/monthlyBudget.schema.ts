import { Schema, Types } from 'mongoose';

import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { OwnershipSchema } from '@shared/infrastructure/mongo/OwnershipSchema';

export interface MonthlyBudgetSchemaType extends OwnershipSchema {
  month: string;
  year: string;
  subCategoryId: string;
  assigned: Types.Decimal128;
  activity: Types.Decimal128;
  available: Types.Decimal128;
}

export const MonthlyBudgetSchema = new Schema<MonthlyBudgetSchemaType>(
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
      type: Schema.Types.Decimal128,
      required: true,
    },
    activity: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    available: {
      type: Schema.Types.Decimal128,
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

export function mapMonthlyBudgetToSchema(entity: MonthlyBudget): MonthlyBudgetSchemaType {
  return {
    _id: entity.id,
    id: entity.id,
    month: entity.month,
    year: entity.year,
    subCategoryId: entity.subCategoryId,
    assigned: new Types.Decimal128(entity.assigned.amount),
    activity: new Types.Decimal128(entity.activity.amount),
    available: new Types.Decimal128(entity.available.amount),
    userId: entity.userId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

export function mapMonthlyBudgetToDomain(document: MonthlyBudgetSchemaType): MonthlyBudget {
  return MonthlyBudget.CREATE(
    document.id,
    document.month,
    document.year,
    document.subCategoryId,
    new UnsignedAmount(document.assigned.toString()),
    new SignedAmount(document.activity.toString()),
    new SignedAmount(document.available.toString()),
    document.userId,
    document.createdAt,
    document.updatedAt,
  );
}

MonthlyBudgetSchema.index({ year: 1, month: 1, subCategoryId: 1 }, { unique: true });
