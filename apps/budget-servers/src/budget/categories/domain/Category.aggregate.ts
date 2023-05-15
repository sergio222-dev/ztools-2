export class Category {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly assignedBudget: string,
    public readonly currentBudget: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static CREATE(id: string, name: string, assignedBudget: string, currentBudget: string) {
    return new Category(id, name, assignedBudget, currentBudget, new Date(), new Date());
  }
}
