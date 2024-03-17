import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { SubCategoryRepository } from '@budget/subCategory/domain/SubCategory.repository';
import {
  mapToSubCategoryDomain,
  mapToSubCategorySchema,
  SubCategorySchemaType,
} from '@budget/subCategory/infrastructure/mongo/subCategory.schema';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filter, FilterOperator, Operator } from '@shared/domain/criteria/Filter';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';
import { MongoRepository } from '@shared/infrastructure/mongo/MongoRepository';

@Injectable()
export class MongoSubCategoryRepository
  extends MongoRepository<SubCategory, SubCategorySchemaType>
  implements SubCategoryRepository
{
  constructor(@InjectConnection() connection: Connection) {
    super(connection);
  }

  protected collectionName(): string {
    return 'subCategories';
  }

  protected getMapperToSchema() {
    return mapToSubCategorySchema;
  }

  protected getMapperToDomain() {
    return mapToSubCategoryDomain;
  }

  // async findAll(): Promise<SubCategory[]> {
  //   return await this.subCategoryModel.find().exec();
  // }

  // async findAllByCategoryId(id: string): Promise<SubCategory[]> {
  //   const subCategoriesDocuments = await this.subCategoryModel
  //     .find({
  //       categoryId: id,
  //     })
  //     .exec();
  //
  //   return subCategoriesDocuments.map(subCategoryDocument => {
  //     return SubCategory.RETRIEVE(
  //       subCategoryDocument.id,
  //       subCategoryDocument.name,
  //       subCategoryDocument.categoryId,
  //       subCategoryDocument.createdAt,
  //       subCategoryDocument.updatedAt,
  //     );
  //   });
  // }

  // async findOneById(id: string): Promise<SubCategory> {
  //   const subCategory = await this.subCategoryModel.findById(id).exec();
  //
  //   if (!subCategory) {
  //     return SubCategory.RETRIEVE(id, '', '', new Date(), new Date());
  //   }
  //
  //   return SubCategory.RETRIEVE(
  //     subCategory.id,
  //     subCategory.name,
  //     subCategory.categoryId,
  //     subCategory.createdAt,
  //     subCategory.updatedAt,
  //   );
  // }

  async save(subCategory: SubCategory): Promise<void> {
    // const createdSubCategory = new this.subCategoryModel(subCategory);
    // void createdSubCategory.save();
    await this.persist(subCategory);
  }

  async delete(subCateogires: SubCategory[]): Promise<void> {
    await this.remove(subCateogires);
  }

  async matching(criteria: Criteria): Promise<SubCategory[]> {
    const documents = await this.searchByCriteria(criteria);
    const mapper = this.getMapperToDomain();

    return documents.map(element => mapper(element));
  }

  // async update(subCategory: SubCategory): Promise<void> {
  //   const oldSubCategory = await this.subCategoryModel.findById(subCategory.id);
  //
  //   if (!oldSubCategory) throw new Error(`SubCategory with id ${subCategory.id} not found`);
  //
  //   await oldSubCategory
  //     .updateOne({
  //       $set: {
  //         name: subCategory.name,
  //         categoryId: subCategory.categoryId,
  //         updatedAt: new Date(),
  //         createdAt: subCategory.createdAt,
  //       },
  //     })
  //     .exec();
  // }

  // async deleteBatch(ids: string[]): Promise<void> {
  //   await this.subCategoryModel.deleteMany({
  //     id: {
  //       $in: ids,
  //     },
  //   });
  // }

  async getSystemSubCategoryData(userId: string, subCategorySystemName: string): Promise<string> {
    const byName = new Filter('name', new FilterOperator(Operator.EQUAL), subCategorySystemName);
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

  async getSystemSubCategoryId(userId: string, subCategoryName: string): Promise<string | null> {
    return await this.getSystemSubCategoryData(userId, subCategoryName);
  }
}
