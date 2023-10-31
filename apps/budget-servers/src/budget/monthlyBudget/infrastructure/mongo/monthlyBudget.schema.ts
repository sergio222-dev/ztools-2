import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { Schema } from 'mongoose';

import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { OwnershipSchema } from '@shared/infrastructure/mongo/OwnershipSchema';
import { AmountType } from '@shared/infrastructure/mongo/plugins';

export interface MonthlyBudgetSchemaType extends OwnershipSchema {
    month: string;
    year: string;
    subCategoryId: string;
    assigned: AmountType;
    activity: AmountType;
    available: AmountType;
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
        assigned: entity.assigned.amount as unknown as AmountType,
        activity: entity.activity.amount as unknown as AmountType,
        available: entity.available.amount as unknown as AmountType,
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
        new UnsignedAmount(document.assigned as unknown as string),
        new SignedAmount(document.activity as unknown as string),
        new SignedAmount(document.available as unknown as string),
        document.userId,
        document.createdAt,
        document.updatedAt,
    );
}

MonthlyBudgetSchema.index({ year: 1, month: 1, subCategoryId: 1 }, { unique: true });
