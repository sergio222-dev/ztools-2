export class Transaction {
  private constructor(
    readonly date: Date,
    readonly payee: string,
    readonly memo: string,
    readonly inflow: string,
    readonly outlfow: string,
    readonly budgetId: string,
  ) {}

  static CREATE(date: Date, payee: string, memo: string, inflow: string, outflow: string, budgetId: string) {
    return new Transaction(date, payee, memo, inflow, outflow, budgetId);
  }
}
