export class AccountCreateCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly userId: string,
    public readonly balance: string,
  ) {}
}
