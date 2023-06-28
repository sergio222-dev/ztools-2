import { ApiProperty } from '@nestjs/swagger';

export class SubCategoryFindAllByCategoryIdQuery {
  constructor(
    private readonly _categoryId: string,
    private readonly _month: string,
    private readonly _year: string,
  ) {}

  @ApiProperty()
  get categoryId(): string {
    return this._categoryId;
  }

  @ApiProperty()
  get month(): string {
    return this._month;
  }

  @ApiProperty()
  get year(): string {
    return this._year;
  }
}
