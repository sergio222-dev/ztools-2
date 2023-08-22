import { Category } from '@core/budget/budget/domain/Category';
import { SubCategory } from '../../../../app/components/forms/AddCategory/AddCategoryForm';

export interface CategoryRepository {
  getAll(month: string, year: string): Promise<Category[]>;
  create(c: Category): Promise<void>;
  createSubCategory(c: SubCategory): Promise<void>;
}
