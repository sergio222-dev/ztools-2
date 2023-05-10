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

  @ApiProperty()
  get assignedBudget(): string {
    return this._assignedBudget;
  }

  @ApiProperty()
  get currentBudget(): string {
    return this._currentBudget;
  }
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _assignedBudget: string,
    private readonly _currentBudget: string,
  ) {}
}
