import { ApiProperty } from '@nestjs/swagger';

export class AccountDeleteCommand {
  @ApiProperty()
  get id(): string {
    return this._id;
  }

  constructor(private readonly _id: string) {}
}
