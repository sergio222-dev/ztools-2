import { ApiProperty } from '@nestjs/swagger';

export class SubCategoryCreateCommand {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _categoryId: string,
  ) {}

  @ApiProperty()
  get id(): string {
    return this._id;
  }

  @ApiProperty()
  get name(): string {
    return this._name;
  }

  @ApiProperty()
  get categoryId(): string {
    return this._categoryId;
  }
}
