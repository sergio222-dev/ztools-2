import { Category } from '@core/budget/budget/domain/Category';

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  get(id: string): Promise<Category>;
}
