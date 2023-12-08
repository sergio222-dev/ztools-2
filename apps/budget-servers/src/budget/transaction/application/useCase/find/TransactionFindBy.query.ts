export class TransactionFindByQuery {
  constructor(
    public readonly userId: string,
    public readonly page: number,
    public readonly limit: number,
    public accountIds?: string[],
  ) {}
}
