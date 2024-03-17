import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { Criteria } from '@shared/domain/criteria/Criteria';

export interface SubCategoryRepository {
  // findAll(): Promise<SubCategory[]>;
  // findOneById(id: string): Promise<SubCategory>;
  // findAllByCategoryId(id: string): Promise<SubCategory[]>;
  // update(subCategory: SubCategory): Promise<void>;
  save(subCategory: SubCategory): Promise<void>;
  getSystemSubCategoryId(userId: string, subCategoryName: string): Promise<string | null>;
  delete(subCategories: SubCategory[]): Promise<void>;
  matching(criteria: Criteria): Promise<SubCategory[]>;
  // deleteBatch(ids: string[]): Promise<void>;
}
