import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';

export class AccountDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly balance: SignedAmount,
  ) {}
}
