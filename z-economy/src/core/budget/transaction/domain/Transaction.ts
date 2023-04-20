export class Transaction {
  constructor(
    public id: string,
    readonly date: string,
    readonly payee: string,
    readonly category: string,
    readonly memo: string,
    public inflow: string,
    public outflow: string,
    private budgetId: string,
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
