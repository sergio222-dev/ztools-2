export class Transaction {
  private constructor(
    readonly date: Date,
    readonly payee: string,
    readonly memo: string,
    readonly inflow: string,
    readonly outlfow: string,
  ) {}

  static CREATE(date: Date, payee: string, memo: string, inflow: string, outflow: string) {
    return new Transaction(date, payee, memo, inflow, outflow);
  }
}
