import { Inject, Injectable } from '@nestjs/common';

import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { SubCategoryRepository } from '@budget/subCategory/domain/SubCategory.repository';

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject('SubCategoryRepository')
    private readonly subCategoryRepository: SubCategoryRepository,
  ) {}

  async findAllByCategoryId(categoryId: string, month: string, year: string): Promise<SubCategory[]> {
    return await this.subCategoryRepository.findAllByCategoryId(categoryId, month, year);
  }

  async findAll(): Promise<SubCategory[]> {
    return this.subCategoryRepository.findAll();
  }

  async create(subCategory: SubCategory): Promise<void> {
    await this.subCategoryRepository.save(subCategory);
  }
}
