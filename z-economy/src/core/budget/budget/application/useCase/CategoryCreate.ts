import { UseCase } from '@core/shared/application/UseCase';
import { Category } from '@core/budget/budget/domain/Category';
import { inject, injectable } from 'tsyringe';
import * as CategoryRepository from '@core/budget/budget/domain/CategoryRepository';
import { SubCategory } from '../../../../../app/components/forms/AddCategory/AddCategoryForm';

@injectable()
export class CategoryCreate implements UseCase<Category, void> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute(c: SubCategory): Promise<void> {
    return await this.categoryRepository.createSubCategory(c);
  }
}
