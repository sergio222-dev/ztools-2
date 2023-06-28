import { ApiProperty } from '@nestjs/swagger';

export class CategoryDeleteCommand {
  constructor(private readonly _id: string) {}

  @ApiProperty()
  get id(): string {
    return this._id;
  }
}
