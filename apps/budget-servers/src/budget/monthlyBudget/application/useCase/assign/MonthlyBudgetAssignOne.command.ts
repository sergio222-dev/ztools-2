export class MonthlyBudgetAssignOneCommand {
    constructor(
        readonly amount: string,
        readonly subCategoryId: string,
        readonly month: string,
        readonly year: string,
        readonly userId: string,
    ) {}
}
