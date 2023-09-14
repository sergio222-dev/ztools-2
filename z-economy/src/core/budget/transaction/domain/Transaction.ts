export class Transaction {
  // TODO makes private
  constructor(
    public id: string,
    public inflow: string,
    public outflow: string,
    public payee: string,
    public memo: string,
    public subCategoryId: string,
    public date: string,
    public cleared: boolean,
    public accountId: string,
  ) {}
}
