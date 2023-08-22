import { Category } from '@core/budget/category/domain/Category';
import { SubCategory } from '@core/budget/category/domain/SubCategory';

export interface CategoryRepository {
  getAll(month: string, year: string): Promise<Category[]>;
  create(c: Category): Promise<void>;
  createSubCategory(c: SubCategory): Promise<void>;
}
