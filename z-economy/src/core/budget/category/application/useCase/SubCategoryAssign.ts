import { UseCase } from '@core/shared/application/UseCase';
import { inject, injectable } from 'tsyringe';
import * as CategoryRepository from '@core/budget/category/domain/CategoryRepository';
import { SubCategoryBudget } from '@core/budget/category/domain/SubCategoryBudget';

@injectable()
export class SubCategoryAssign implements UseCase<SubCategoryBudget, void> {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository.CategoryRepository,
  ) {}

  async execute(b: SubCategoryBudget): Promise<void> {
    return await this.categoryRepository.assignSubCategoryBudget(b);
  }
}
