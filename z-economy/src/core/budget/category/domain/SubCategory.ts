export class SubCategory {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly categoryId: string,
    public assigned: string,
    readonly activity: string,
    readonly available: string,
  ) {}
}
