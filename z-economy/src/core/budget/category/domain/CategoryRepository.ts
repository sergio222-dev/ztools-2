import { Category } from '@core/budget/category/domain/Category';
import { SubCategory } from '@core/budget/category/domain/SubCategory';
import { SubCategoryBudget } from '@core/budget/category/domain/SubCategoryBudget';
import { CategoryDeleteRequest } from '@core/budget/category/domain/CategoryDeleteRequest';
import { CategoryAnalytics } from '@core/budget/category/domain/CategoryAnalytics';

export interface CategoryRepository {
  getAll(month: string, year: string): Promise<Category[]>;
  create(c: Category): Promise<void>;
  deleteCategory(ids: CategoryDeleteRequest): Promise<void>;
  update(c: Category): Promise<void>;
  createSubCategory(c: SubCategory): Promise<void>;
  assignSubCategoryBudget(b: SubCategoryBudget): Promise<void>;
  updateSubCategory(c: SubCategory): Promise<void>;
  deleteSubCategory(ids: CategoryDeleteRequest): Promise<void>;
  getAnalyticsData(): Promise<CategoryAnalytics[]>;
  createInitialCategoriesIfNeeded(): Promise<{ categoryId: string; subCategoryId: string }>;
}
