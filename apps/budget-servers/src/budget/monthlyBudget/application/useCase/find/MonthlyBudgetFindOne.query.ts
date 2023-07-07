import { ApiProperty } from '@nestjs/swagger';

export class MonthlyBudgetFindOneQuery {
  constructor(
    private readonly _year: string,
    private readonly _month: string,
    private readonly _subCategoryId: string,
  ) {}

  @ApiProperty()
  get year(): string {
    return this._year;
  }

  @ApiProperty()
  get month(): string {
    return this._month;
  }

  @ApiProperty()
  get subCategoryId(): string {
    return this._subCategoryId;
  }
}
