import { ApiProperty } from '@nestjs/swagger';

export class TransactionUpdateCommand {
  constructor(
    private readonly _id: string,
    private readonly _inflow: string,
    private readonly _outflow: string,
    private readonly _payee: string,
    private readonly _memo: string,
    private readonly _category: string,
    private readonly _date: Date,
    private readonly _cleared: boolean,
  ) {}

  @ApiProperty()
  get id(): string {
    return this._id;
  }

  @ApiProperty()
  get inflow(): string {
    return this._inflow;
  }

  @ApiProperty()
  get outflow(): string {
    return this._outflow;
  }

  @ApiProperty()
  get payee(): string {
    return this._payee;
  }

  @ApiProperty()
  get memo(): string {
    return this._memo;
  }

  @ApiProperty()
  get category(): string {
    return this._category;
  }

  @ApiProperty()
  get date(): Date {
    return this._date;
  }

  @ApiProperty()
  get cleared(): boolean {
    return this._cleared;
  }
}
