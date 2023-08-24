import { SubCategory } from '@core/budget/category/domain/SubCategory';

export class Category {
  constructor(readonly id: string, readonly name: string, readonly subCategories: SubCategory[]) {}
}
