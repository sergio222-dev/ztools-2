import { Schema } from 'mongoose';

import { ExtendOfDocument } from '@shared/infrastructure/mongo/utils';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';

export const SubCategorySchema = new Schema<ExtendOfDocument<SubCategory>>(
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
