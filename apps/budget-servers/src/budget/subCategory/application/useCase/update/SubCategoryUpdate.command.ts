export class SubCategoryUpdateCommand {
  constructor(readonly id: string, readonly name: string, readonly categoryId: string) {}
}
