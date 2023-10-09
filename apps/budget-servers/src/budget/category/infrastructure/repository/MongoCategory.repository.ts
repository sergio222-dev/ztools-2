import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { Category } from '@budget/category/domain/Category.aggregate';
import { CategoryRepository } from '@budget/category/domain/Category.repository';
import {
  CategorySchemaType,
  mapToCategoryDomain,
  mapToCategorySchema,
} from '@budget/category/infrastructure/mongo/category.schema';
import { MongoRepository } from '@shared/infrastructure/mongo/MongoRepository';

@Injectable()
export class MongoCategoryRepository
  extends MongoRepository<Category, CategorySchemaType>
  implements CategoryRepository
{
  constructor(@InjectConnection() connection: Connection) {
    super(connection);
  }

  protected collectionName(): string {
    return 'Category';
  }

  protected getMapperToSchema() {
    return mapToCategorySchema;
  }

  protected getMapperToDomain() {
    return mapToCategoryDomain;
  }

  async findAll(): Promise<Category[]> {}

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
