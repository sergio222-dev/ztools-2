export class TransactionMoveSubCategoryCommand {
  constructor(
    readonly oldSubCategoryId: string,
    readonly newSubCategoryId: string,
    readonly userId: string,
  ) {}
}
