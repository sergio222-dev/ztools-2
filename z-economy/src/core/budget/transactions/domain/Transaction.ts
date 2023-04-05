export class Transaction {
  constructor(
    readonly date: string,
    readonly payee: string,
    readonly category: string,
    readonly memo: string,
    readonly inflow: string,
    readonly outflow: string,
    readonly budgetId: string,
  ) {}

  static CREATE(
    date: string,
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
