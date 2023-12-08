import { Category } from '@budget/category/domain/Category.aggregate';
import { CategoryRepository } from '@budget/category/domain/Category.repository';
import {
  CategorySchemaType,
  mapToCategoryDomain,
  mapToCategorySchema,
} from '@budget/category/infrastructure/mongo/category.schema';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filter, FilterOperator, Operator } from '@shared/domain/criteria/Filter';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';
import { MongoRepository } from '@shared/infrastructure/mongo/MongoRepository';
import { Connection } from 'mongoose';

@Injectable()
export class MongoCategoryRepository
  extends MongoRepository<Category, CategorySchemaType>
  implements CategoryRepository
{
  constructor(@InjectConnection() connection: Connection) {
    super(connection);
  }

  protected collectionName(): string {
    return 'categories';
  }

  protected getMapperToSchema() {
    return mapToCategorySchema;
  }

  protected getMapperToDomain() {
    return mapToCategoryDomain;
  }

  async save(category: Category): Promise<void> {
    await this.persist(category);
  }

  async delete(categories: Category[]): Promise<void> {
    await this.remove(categories);
  }

  async matching(criteria: Criteria): Promise<Category[]> {
    const documents = await this.searchByCriteria(criteria);
    const mapper = this.getMapperToDomain();

    return documents.map(element => mapper(element));
  }

  async getSystemCategoryData(userId: string, categorySystemName: string): Promise<string> {
    const byName = new Filter('name', new FilterOperator(Operator.EQUAL), categorySystemName);
    const byUser = FilterByUser.fromValue(userId);

    const filters = new Filters([byName, byUser]);
    const criteria = new Criteria(filters, Order.fromValues(), 0, 0);

    const categories = await this.matching(criteria);

    if (categories.length === 0) {
      return '';
    }

    if (categories.length > 1) {
      // TODO: domain exception
      throw new Error('Too many system categories');
    }

    return categories[0].id;
  }

  async getSystemCategoryId(userId: string, categorySystemName: string): Promise<string> {
    return await this.getSystemCategoryData(userId, categorySystemName);
  }
}
