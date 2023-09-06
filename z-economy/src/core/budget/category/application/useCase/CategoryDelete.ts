import { inject, injectable } from 'tsyringe';
import { UseCase } from '@core/shared/application/UseCase';
import * as CategoryRepository from '@core/budget/category/domain/CategoryRepository';

@injectable()
export class CategoryDelete implements UseCase<unknown, void> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return await this.categoryRepository.deleteCategory(id);
  }
}
