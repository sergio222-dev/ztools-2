export class SubCategoryBudget {
  constructor(
    readonly amount: string,
    readonly subCategoryId: string,
    readonly month: string,
    readonly year: string,
  ) {}
}
