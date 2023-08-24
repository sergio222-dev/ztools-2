export class SubCategory {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly categoryId: string,
    readonly assignedBudget: string,
    readonly activity: string,
    readonly available: string,
  ) {}
}
