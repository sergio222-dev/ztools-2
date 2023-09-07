import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';

export class Account extends AggregateRoot {
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get balance(): SignedAmount {
    return this._balance || new SignedAmount(0);
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  private constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
    private _balance?: SignedAmount,
  ) {
    super();
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
