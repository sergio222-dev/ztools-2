import { Category } from '@core/budget/category/domain/Category';
import { SubCategory } from '@core/budget/category/domain/SubCategory';
import { SubCategoryBudget } from '@core/budget/category/domain/SubCategoryBudget';
import { SubCategoryDeleteBody } from '@core/budget/category/domain/SubCategoryDeleteBody';

export interface CategoryRepository {
  getAll(month: string, year: string): Promise<Category[]>;
  create(c: Category): Promise<void>;
  createSubCategory(c: SubCategory): Promise<void>;
  assignSubCategoryBudget(b: SubCategoryBudget): Promise<void>;
  deleteCategory(id: string): Promise<void>;
  deleteSubCategory(ids: SubCategoryDeleteBody): Promise<void>;
}
