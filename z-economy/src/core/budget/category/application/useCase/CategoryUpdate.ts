import { UseCase } from '@core/shared/application/UseCase';
import { Category } from '@core/budget/category/domain/Category';
import { inject, injectable } from 'tsyringe';
import * as CategoryRepository from '@core/budget/category/domain/CategoryRepository';

@injectable()
export class CategoryUpdate implements UseCase<Category, void> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute(c: Category): Promise<void> {
    return await this.categoryRepository.update(c);
  }
}
