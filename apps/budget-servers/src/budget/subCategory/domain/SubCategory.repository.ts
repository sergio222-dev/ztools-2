import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';

export interface SubCategoryRepository {
  findAll(): Promise<SubCategory[]>;
  findOneById(id: string): Promise<SubCategory>;
  findAllByCategoryId(id: string): Promise<SubCategory[]>;
  update(subCategory: SubCategory): Promise<void>;
  save(subCategory: SubCategory): Promise<void>;
  delete(id: string): Promise<void>;
  deleteBatch(ids: string[]): Promise<void>;
}
