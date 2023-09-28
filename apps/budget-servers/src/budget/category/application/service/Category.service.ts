import { Inject, Injectable } from '@nestjs/common';

import { Category } from '@budget/category/domain/Category.aggregate';
import { CategoryRepository } from '@budget/category/domain/Category.repository';
import { SubCategoryRepository } from '@budget/subCategory/domain/SubCategory.repository';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
    @Inject('SubCategoryRepository')
    private readonly subCategoryRepository: SubCategoryRepository,
  ) {}

  async createOne(category: Category): Promise<void> {
    await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();

    // const arrayPromises = categories.map(async (category) => {
    //   const subCategories = await this.subCategoryRepository.findAllByCategoryId(category.id);
    //
    //   const subCategoriesDto = subCategories.map((subCategory) => {
    //     let assigned = new BigNumber(0);
    //     let spent = new BigNumber(0);
    //
    //     for (const monthlyBudget of subCategory.monthlyBudgets) {
    //       assigned = assigned.plus(new BigNumber(monthlyBudget.assigned));
    //       spent = spent.plus(new BigNumber(monthlyBudget.spent));
    //     }
    //
    //     return new SubCategoryDto(subCategory.id, subCategory.name, assigned.toString(), spent.toString());
    //   });
    //
    //   return new CategoryDto(category.id, category.name, subCategoriesDto);
    // });
    //
    // return await Promise.all(arrayPromises);
  }

  async findOneById(id: string): Promise<Category> {
    return this.categoryRepository.findOneById(id);
  }

  async update(category: Category): Promise<void> {
    await this.categoryRepository.update(category);
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
