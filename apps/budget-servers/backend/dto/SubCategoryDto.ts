export class SubCategoryDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly categoryId: string,
    public readonly assignedBudget: string,
    public readonly activity: string,
    public readonly available: string,
  ) {}
}
