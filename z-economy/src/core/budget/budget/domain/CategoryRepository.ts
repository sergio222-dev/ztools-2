import { Category } from '@core/budget/budget/domain/Category';

export interface CategoryRepository {
  getAll(month: string, year: string): Promise<Category[]>;
  create(c: Category): Promise<void>;
}
