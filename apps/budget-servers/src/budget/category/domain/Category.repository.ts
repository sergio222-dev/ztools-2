import { Category } from '@budget/category/domain/Category.aggregate';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findOneById(id: string): Promise<Category>;
  update(category: Category): Promise<void>;
  save(category: Category): Promise<void>;
  delete(id: string): Promise<void>;
}
