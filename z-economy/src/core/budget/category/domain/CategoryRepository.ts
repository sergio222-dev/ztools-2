import { Category } from '@core/budget/category/domain/Category';
import { SubCategory } from '@core/budget/category/domain/SubCategory';
import { SubCategoryBudget } from '@core/budget/category/domain/SubCategoryBudget';

export interface CategoryRepository {
  getAll(month: string, year: string): Promise<Category[]>;
  create(c: Category): Promise<void>;
  createSubCategory(c: SubCategory): Promise<void>;
  assignSubCategoryBudget(b: SubCategoryBudget): Promise<void>;
}
