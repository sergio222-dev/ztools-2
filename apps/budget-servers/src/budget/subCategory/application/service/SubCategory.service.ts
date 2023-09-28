import { Inject, Injectable } from '@nestjs/common';

import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { SubCategoryRepository } from '@budget/subCategory/domain/SubCategory.repository';

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject('SubCategoryRepository')
    private readonly subCategoryRepository: SubCategoryRepository,
  ) {}

  async findAllByCategoryId(categoryId: string): Promise<SubCategory[]> {
    return await this.subCategoryRepository.findAllByCategoryId(categoryId);
  }

  async findAll(): Promise<SubCategory[]> {
    return this.subCategoryRepository.findAll();
  }

  async findOneById(id: string): Promise<SubCategory> {
    return await this.subCategoryRepository.findOneById(id);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.subCategoryRepository.delete(id);
  }

  async create(subCategory: SubCategory): Promise<void> {
    await this.subCategoryRepository.save(subCategory);
  }

  async update(subCategory: SubCategory): Promise<void> {
    await this.subCategoryRepository.update(subCategory);
  }
  async deleteBatch(ids: string[]): Promise<void> {
    await this.subCategoryRepository.deleteBatch(ids);
  }
}
