import { inject, injectable } from 'tsyringe';
import { UseCase } from '@core/shared/application/UseCase';
import * as CategoryRepository from '@core/budget/category/domain/CategoryRepository';
import { CategoryDeleteRequest } from '@core/budget/category/domain/CategoryDeleteRequest';

@injectable()
export class CategoryDelete implements UseCase<unknown, void> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute(ids: CategoryDeleteRequest): Promise<void> {
    return await this.categoryRepository.deleteCategory(ids);
  }
}
