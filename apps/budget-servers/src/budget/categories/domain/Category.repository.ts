import { Category } from '@budget/categories/domain/Category.aggregate';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findOneById(id: string): Promise<Category>;
  update(category: Category): Promise<void>;
  save(category: Category): Promise<void>;
}
