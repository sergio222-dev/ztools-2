import { Category } from '@core/budget/budget/domain/Category';
import { SubCategory } from '@core/budget/budget/domain/SubCategory';

export interface CategoryRepository {
  getAll(month: string, year: string): Promise<Category[]>;
  create(c: Category): Promise<void>;
  createSubCategory(c: SubCategory): Promise<void>;
}
