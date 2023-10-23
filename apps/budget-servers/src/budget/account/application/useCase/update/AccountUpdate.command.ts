export class AccountUpdateCommand {
  constructor(public readonly id: string, public readonly name: string, public readonly userId: string) {}
}
