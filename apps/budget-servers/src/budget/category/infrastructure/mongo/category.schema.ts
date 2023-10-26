import { Schema } from 'mongoose';

import { Category } from '@budget/category/domain/Category.aggregate';
import { OwnershipSchema } from '@shared/infrastructure/mongo/OwnershipSchema';

export interface CategorySchemaType extends OwnershipSchema {
  name: string;
}

export const CategorySchema = new Schema<CategorySchemaType>(
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
    name: {
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

export function mapToCategorySchema(category: Category): CategorySchemaType {
  return {
    _id: category.id,
    id: category.id,
    name: category.name,
    userId: category.userId,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export function mapToCategoryDomain(category: CategorySchemaType): Category {
  return Category.RETRIEVE(
    category._id,
    category.name,
    category.userId,
    category.createdAt,
    category.updatedAt,
  );
}
