import { UseCase } from '@core/shared/application/UseCase';
import * as CategoryRepository from '@core/budget/category/domain/CategoryRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CategoryCreateInitials
  implements UseCase<unknown, { categoryId: string; subCategoryId: string }>
{
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute() {
    return await this.categoryRepository.createInitialCategoriesIfNeeded();
  }
}
