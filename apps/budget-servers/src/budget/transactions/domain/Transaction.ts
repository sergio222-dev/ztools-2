export class Transaction {
  public readonly id: string;
  public readonly inflow: string;
  public readonly outflow: string;
  public readonly payee: string;
  public readonly memo: string;
  public readonly date: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  private constructor(
    id: string,
    inflow: string,
    outflow: string,
    payee: string,
    memo: string,
    date: Date,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.inflow = inflow;
    this.outflow = outflow;
    this.payee = payee;
    this.memo = memo;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static CREATE(id: string, inflow: string, outflow: string, payee: string, memo: string, date: Date) {
    return new Transaction(id, inflow, outflow, payee, memo, date, new Date(), new Date());
  }
}
