export class SubCategoryCreateCommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly categoryId: string,
    readonly userId: string,
  ) {}
}
