export class Transaction {
  private constructor(
    readonly date: Date,
    readonly payee: string,
    readonly category: string,
    readonly memo: string,
    readonly inflow: string,
    readonly outflow: string,
    readonly budgetId: string,
  ) {}

  static CREATE(
    date: Date,
    payee: string,
    category: string,
    memo: string,
    inflow: string,
    outflow: string,
    budgetId: string,
  ) {
    return new Transaction(date, payee, category, memo, inflow, outflow, budgetId);
  }
}
