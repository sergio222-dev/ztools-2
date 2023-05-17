import { Schema, Document } from 'mongoose';
import { Category } from '@budget/categories/domain/Category.aggregate';

export const CategorySchema = new Schema<Document<string> & Category>(
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
    assignedBudget: {
      type: String,
      required: false,
      default: () => '0',
    },
    currentBudget: {
      type: String,
      required: false,
      default: () => '0',
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
