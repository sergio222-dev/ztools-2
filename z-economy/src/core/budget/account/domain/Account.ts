export class Account {
  constructor(readonly id: string, readonly name: string, readonly balance: { _amount: string }) {}
}
