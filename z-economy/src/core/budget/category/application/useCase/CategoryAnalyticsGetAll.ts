import { inject, injectable } from 'tsyringe';
import { UseCase } from '@core/shared/application/UseCase';
import * as CategoryRepository from '@core/budget/category/domain/CategoryRepository';
import { CategoryAnalytics } from '@core/budget/category/domain/CategoryAnalytics';

@injectable()
export class CategoryAnalyticsGetAll implements UseCase<unknown, CategoryAnalytics[]> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute(): Promise<CategoryAnalytics[]> {
    return await this.categoryRepository.getAnalyticsData();
  }
}
