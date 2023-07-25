import { ApiProperty } from '@nestjs/swagger';

export class CreateEntityDto {
  get parent_id(): string | undefined {
    return this._parent_id;
  }

  @ApiProperty()
  get id(): string {
    return this._id;
  }

  @ApiProperty()
  get name(): string {
    return this._name;
  }

  @ApiProperty()
  get description(): string | undefined {
    return this._description;
  }
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _description?: string,
    private readonly _parent_id?: string,
  ) {}
}
