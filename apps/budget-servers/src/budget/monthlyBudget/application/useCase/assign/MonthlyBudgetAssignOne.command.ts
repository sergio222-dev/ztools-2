import { ApiProperty } from '@nestjs/swagger';

export class MonthlyBudgetAssignOneCommand {
  constructor(
    private readonly _amount: string,
    private readonly _subCategoryId: string,
    private readonly _month: string,
    private readonly _year: string,
  ) {}

  @ApiProperty()
  get amount(): string {
    return this._amount;
  }

  @ApiProperty()
  get subCategoryId(): string {
    return this._subCategoryId;
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
