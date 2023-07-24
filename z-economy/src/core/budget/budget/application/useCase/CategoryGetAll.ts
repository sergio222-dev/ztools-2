import { inject, injectable } from 'tsyringe';
import * as CategoryRepository from '@core/budget/budget/domain/CategoryRepository';
import { UseCase } from '@core/shared/application/UseCase';
import { Category } from '@core/budget/budget/domain/Category';

@injectable()
export class CategoryGetAll implements UseCase<unknown, Category[]> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute(date: { month: string; year: string }): Promise<Category[]> {
    return await this.categoryRepository.getAll(date.month, date.year);
  }
}
