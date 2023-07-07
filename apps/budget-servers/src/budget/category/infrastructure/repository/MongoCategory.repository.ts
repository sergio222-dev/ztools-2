import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '@budget/category/domain/Category.aggregate';
import { CategoryRepository } from '@budget/category/domain/Category.repository';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';

@Injectable()
export class MongoCategoryRepository implements CategoryRepository {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
    @InjectModel('SubCategory')
    private readonly subCategoryModel: Model<SubCategory>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async save(category: Category): Promise<void> {
    const createdCategory = new this.categoryModel(category);
    void (await createdCategory.save());
  }

  async update(category: Category): Promise<void> {
    const oldCategory = await this.categoryModel.findById(category.id).exec();

    if (!oldCategory) throw new Error(`Category with id: ${category.id} not found`);

    oldCategory.$set('isNew', false);

    oldCategory.set('name', category.name);
    oldCategory.set('updatedAt', new Date());

    await oldCategory.save();
  }

  async findOneById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) {
      return Category.RETRIEVE('', '', new Date(), new Date());
    }

    return Category.RETRIEVE(id, category.name, category.createdAt, category.updatedAt);
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id);
  }
}
