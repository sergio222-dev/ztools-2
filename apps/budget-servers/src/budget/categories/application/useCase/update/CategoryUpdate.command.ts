export class CategoryUpdateCommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly assignedBudget: string,
    readonly currentBudget: string,
  ) {}
}
