export class SubCategoryDeleteBatchCommand {
  constructor(readonly ids: string[], readonly userId: string) {}
}
