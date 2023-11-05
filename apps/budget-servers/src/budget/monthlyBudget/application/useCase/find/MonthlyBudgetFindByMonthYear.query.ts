export class MonthlyBudgetFindByMonthYearQuery {
  constructor(readonly month: string, readonly year: string, readonly userId: string) {}
}
