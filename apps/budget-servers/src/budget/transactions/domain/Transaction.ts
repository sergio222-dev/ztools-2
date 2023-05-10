export class Transaction {
  public readonly id: string;
  public readonly inflow: string;
  public readonly outflow: string;
  public readonly payee: string;
  public readonly memo: string;
  public readonly category: string;
  public readonly date: Date;
  public readonly cleared: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  private constructor(
    id: string,
    inflow: string,
    outflow: string,
    payee: string,
    memo: string,
    category: string,
    date: Date,
    cleared: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.inflow = inflow;
    this.outflow = outflow;
    this.payee = payee;
    this.memo = memo;
    this.category = category;
    this.date = date;
    this.cleared = cleared;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static CREATE(
    id: string,
    inflow: string,
    outflow: string,
    payee: string,
    memo: string,
    category: string,
    date: Date,
    cleared: boolean,
  ) {
    return new Transaction(id, inflow, outflow, payee, memo, category, date, cleared, new Date(), new Date());
  }
}
