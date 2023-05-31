export class Transaction {
  // TODO makes private
  constructor(
    public id: string,
    public date: string,
    public payee: string,
    public category: string,
    public memo: string,
    public inflow: string,
    public outflow: string,
    public cleared: boolean,
  ) {}
}
