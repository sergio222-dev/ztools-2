export class Transaction {
  // TODO makes private
  constructor(
    public id: string,
    public date: string,
    public payee: string,
    public category: string,
    public memo: string,
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
