import { Category } from '@budget/category/domain/Category.aggregate';
import { Criteria } from '@shared/domain/criteria/Criteria';

export interface CategoryRepository {
    save(category: Category): Promise<void>;
    delete(categories: Category[]): Promise<void>;
    matching(criteria: Criteria): Promise<Category[]>;
}
