import { Schema } from 'mongoose';

import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { OwnershipSchema } from '@shared/infrastructure/mongo/OwnershipSchema';

export interface SubCategorySchemaType extends OwnershipSchema {
  name: string;
  categoryId: string;
}

export const SubCategorySchema = new Schema<SubCategorySchemaType>(
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
    categoryId: {
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

export function mapToSubCategorySchema(subCategory: SubCategory): SubCategorySchemaType {
  return {
    _id: subCategory.id,
    id: subCategory.id,
    name: subCategory.name,
    userId: subCategory.userId,
    categoryId: subCategory.categoryId,
    createdAt: subCategory.createdAt,
    updatedAt: subCategory.updatedAt,
  };
}

export function mapToSubCategoryDomain(subCategory: SubCategorySchemaType): SubCategory {
  return SubCategory.RETRIEVE(
    subCategory._id,
    subCategory.name,
    subCategory.userId,
    subCategory.categoryId,
    subCategory.createdAt,
    subCategory.updatedAt,
  );
}
