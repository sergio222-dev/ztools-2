import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { SubCategoryRepository } from '@budget/subCategory/domain/SubCategory.repository';

@Injectable()
export class MongoSubCategoryRepository implements SubCategoryRepository {
  constructor(
    @InjectModel('SubCategory')
    private readonly subCategoryModel: Model<SubCategory>,
  ) {}

  async findAllByCategoryId(id: string): Promise<SubCategory[]> {
    const subCategoriesDocuments = await this.subCategoryModel
      .find({
        categoryId: id,
      })
      .exec();

    const subCategories = subCategoriesDocuments.map(subCategoryDocument => {
      const newSubCategory = SubCategory.RETRIEVE(
        subCategoryDocument.id,
        subCategoryDocument.name,
        subCategoryDocument.categoryId,
        subCategoryDocument.createdAt,
        subCategoryDocument.updatedAt,
      );

      return newSubCategory;
    });

    return subCategories;
  }

  async delete(id: string): Promise<void> {
    await this.subCategoryModel.deleteOne({ _id: id }).exec();
  }

  async findOneById(id: string): Promise<SubCategory> {
    const subCategory = await this.subCategoryModel.findById(id).exec();

    if (!subCategory) {
      return SubCategory.RETRIEVE(id, '', '', new Date(), new Date());
    }

    return SubCategory.RETRIEVE(
      subCategory.id,
      subCategory.name,
      subCategory.categoryId,
      subCategory.createdAt,
      subCategory.updatedAt,
    );
  }

  async save(subCategory: SubCategory): Promise<void> {
    const createdSubCategory = new this.subCategoryModel(subCategory);
    void createdSubCategory.save();
  }

  async update(subCategory: SubCategory): Promise<void> {
    const oldSubCategory = await this.subCategoryModel.findById(subCategory.id);

    if (!oldSubCategory) throw new Error(`SubCategory with id ${subCategory.id} not found`);

    await oldSubCategory
      .updateOne({
        $set: {
          name: subCategory.name,
          categoryId: subCategory.categoryId,
          updatedAt: new Date(),
          createdAt: subCategory.createdAt,
        },
      })
      .exec();
  }
}
