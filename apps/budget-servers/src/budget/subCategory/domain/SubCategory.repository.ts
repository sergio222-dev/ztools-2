import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';

export interface SubCategoryRepository {
  findOneById(id: string): Promise<SubCategory>;
  findAllByCategoryId(id: string, month?: string, year?: string): Promise<SubCategory[]>;
  update(subCategory: SubCategory): Promise<void>;
  save(subCategory: SubCategory): Promise<void>;
  delete(id: string): Promise<void>;
}
