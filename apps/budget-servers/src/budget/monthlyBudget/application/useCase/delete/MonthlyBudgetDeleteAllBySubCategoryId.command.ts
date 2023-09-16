export class MonthlyBudgetDeleteAllBySubCategoryIdCommand {
  constructor(private readonly _subCategoryId: string) {}

  get subCategoryId(): string {
    return this._subCategoryId;
  }
}
