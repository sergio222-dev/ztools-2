import { inject, injectable } from 'tsyringe';
import { UseCase } from '@core/shared/application/UseCase';
import * as CategoryRepository from '@core/budget/category/domain/CategoryRepository';
import { SubCategoryDeleteBody } from '@core/budget/category/domain/SubCategoryDeleteBody';

@injectable()
export class SubCategoryDelete implements UseCase<unknown, void> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute(ids: SubCategoryDeleteBody): Promise<void> {
    return await this.categoryRepository.deleteSubCategory(ids);
  }
}
