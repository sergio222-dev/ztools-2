import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateCommand {
  @ApiProperty()
  get id(): string {
    return this._id;
  }

  @ApiProperty()
  get name(): string {
    return this._name;
  }

  constructor(private readonly _id: string, private readonly _name: string) {}
}
