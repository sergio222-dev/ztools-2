import { ApiProperty } from '@nestjs/swagger';

export class SubCategoryDeleteBatchCommand {
  constructor(private readonly _ids: string[]) {}

  @ApiProperty()
  get ids(): string[] {
    return this._ids;
  }
}
