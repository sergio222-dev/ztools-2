import { ApiProperty } from '@nestjs/swagger';

export class SubCategoryDeleteRequest {
  constructor(private readonly _id: string, private readonly _subCategoryId: string) {}

  @ApiProperty()
  get id(): string {
    return this._id;
  }

  @ApiProperty()
  get subCategoryId(): string {
    return this._subCategoryId;
  }
}
