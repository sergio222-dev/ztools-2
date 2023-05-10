import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from '@budget/categories/domain/Category.aggregate';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryRepository } from '@budget/categories/domain/Category.repository';

@Injectable()
export class MongoCategoryRepository implements CategoryRepository {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
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
    oldCategory.set('assignedBudget', category.assignedBudget);
    oldCategory.set('currentBudget', category.currentBudget);
    oldCategory.set('updatedAt', new Date());

    await oldCategory.save();
  }

  async findOneById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) {
      return Category.CREATE('', '', '', '');
    }

    return Category.CREATE(id, category.name, category.assignedBudget, category.currentBudget);
  }
}
