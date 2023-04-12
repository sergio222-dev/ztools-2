export class Transaction {
  constructor(
    readonly id: string,
    readonly date: string,
    readonly payee: string,
    public category: string,
    readonly memo: string,
    readonly inflow: string,
    readonly outflow: string,
    readonly budgetId: string,
  ) {}

  static CREATE(
    id: string,
    date: string,
    payee: string,
    category: string,
    memo: string,
    inflow: string,
    outflow: string,
    budgetId: string,
  ) {
    return new Transaction(id, date, payee, category, memo, inflow, outflow, budgetId);
  }
}
