export class TransactionDeleteBatchCommand {
  constructor(public readonly ids: string[], public readonly userId: string) {}
}
