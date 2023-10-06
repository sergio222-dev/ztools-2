import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';

export class Account extends AggregateRoot {
  get name(): string {
    return this._name;
  }

  get balance(): SignedAmount {
    return this._balance || new SignedAmount(0);
  }

  private constructor(
    _id: string,
    private readonly _name: string,
    _createdAt: Date,
    _updatedAt: Date,
    private _balance?: SignedAmount,
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public static CREATE(id: string, name: string, balance?: SignedAmount) {
    return new Account(id, name, new Date(), new Date(), balance);
  }

  public static RETRIEVE(id: string, name: string, balance: SignedAmount, createdAt: Date, updatedAt: Date) {
    return new Account(id, name, createdAt, updatedAt, balance);
  }

  public static UPDATE(id: string, name: string, balance: SignedAmount, createdAt: Date) {
    return new Account(id, name, new Date(), new Date(), balance);
  }
}
