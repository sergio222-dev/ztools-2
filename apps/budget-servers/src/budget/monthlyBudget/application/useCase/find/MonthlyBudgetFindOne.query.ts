export class MonthlyBudgetFindOneQuery {
    constructor(
        readonly year: string,
        readonly month: string,
        readonly subCategoryId: string,
        readonly userId: string,
    ) {}
}
