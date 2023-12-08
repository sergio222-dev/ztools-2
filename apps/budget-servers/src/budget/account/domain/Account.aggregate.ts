import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { AggregateRootOwnership } from '@shared/domain/aggregate/AggregateRootOwnership';

export class Account extends AggregateRootOwnership {
  get name(): string {
    return this._name;
  }

  get balance(): SignedAmount {
    return this._balance;
  }

  private constructor(
    _id: string,
    private readonly _name: string,
    private _balance: SignedAmount,
    _userId: string,
    _createdAt: Date,
    _updatedAt: Date,
  ) {
    super(_id, _userId, _createdAt, _updatedAt);
  }

  public static CREATE(id: string, name: string, userId: string, balance: SignedAmount) {
    return new Account(id, name, balance, userId, new Date(), new Date());
  }

  public static RETRIEVE(
    id: string,
    name: string,
    userId: string,
    balance: SignedAmount,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new Account(id, name, balance, userId, createdAt, updatedAt);
  }

  public static UPDATE(id: string, name: string, userId: string, balance: SignedAmount, createdAt: Date) {
    return new Account(id, name, balance, userId, createdAt, new Date());
  }
}
