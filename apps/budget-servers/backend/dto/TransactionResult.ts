export class TransactionResult {
  constructor(
    public readonly id: string,
    public readonly inflow: string,
    public readonly outflow: string,
    public readonly payee: string,
    public readonly memo: string,
    public readonly subCategoryId: string,
    public readonly date: string,
    public readonly cleared: boolean,
  ) {}
}