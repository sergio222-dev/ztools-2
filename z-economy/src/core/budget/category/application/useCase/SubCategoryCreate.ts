import { UseCase } from '@core/shared/application/UseCase';
import { inject, injectable } from 'tsyringe';
import * as CategoryRepository from '@core/budget/category/domain/CategoryRepository';
import { SubCategory } from '@core/budget/category/domain/SubCategory';

@injectable()
export class SubCategoryCreate implements UseCase<SubCategory, void> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute(c: SubCategory): Promise<void> {
    return await this.categoryRepository.createSubCategory(c);
  }
}
