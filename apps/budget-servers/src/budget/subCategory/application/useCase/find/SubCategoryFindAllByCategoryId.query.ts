import { ApiProperty } from '@nestjs/swagger';

export class SubCategoryFindAllByCategoryIdQuery {
  constructor(private readonly _categoryId: string) {}

  @ApiProperty()
  get categoryId(): string {
    return this._categoryId;
  }
}
