import { Schema } from 'mongoose';

import { ExtendOfDocument } from '../../../../shared/infrastructure/mongo/utils';
import { Category } from '@budget/category/domain/Category.aggregate';

export const CategorySchema = new Schema<ExtendOfDocument<Category>>(
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
