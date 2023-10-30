export class MonthlyBudgetDeleteAllBySubCategoryIdCommand {
    constructor(readonly subCategoryId: string, readonly userId: string) {}
}
