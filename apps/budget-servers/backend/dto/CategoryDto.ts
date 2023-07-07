import { SubCategoryDto } from './SubCategoryDto';

export class CategoryDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly subCategories: SubCategoryDto[],
  ) {}
}
