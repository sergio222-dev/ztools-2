import { UseCase } from '@core/shared/application/UseCase';
import { Category } from '@core/budget/budget/domain/Category';
import { inject, injectable } from 'tsyringe';
import * as CategoryRepository from '@core/budget/budget/domain/CategoryRepository';

@injectable()
export class CategoryGet implements UseCase<string, Category> {
  constructor(
    @inject('BudgetRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute(id: string): Promise<Category> {
    return await this.categoryRepository.get(id);
  }
}
