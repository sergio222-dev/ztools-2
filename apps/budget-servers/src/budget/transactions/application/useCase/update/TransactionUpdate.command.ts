export class TransactionUpdateCommand {
  constructor(
    private readonly _id: string,
    private readonly _inflow: string,
    private readonly _outflow: string,
    private readonly _payee: string,
    private readonly _memo: string,
    private readonly _category: string,
    private readonly _date: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get inflow(): string {
    return this._inflow;
  }

  get outflow(): string {
    return this._outflow;
  }

  get payee(): string {
    return this._payee;
  }

  get memo(): string {
    return this._memo;
  }

  get category(): string {
    return this._category;
  }

  get date(): Date {
    return this._date;
  }
}
