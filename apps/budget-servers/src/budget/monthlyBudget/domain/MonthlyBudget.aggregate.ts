import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';

export class MonthlyBudget extends AggregateRoot {
  get id(): string {
    return this._id;
  }

  get month(): string {
    return this._month;
  }

  get year(): string {
    return this._year;
  }

  get subCategoryId(): string {
    return this._subCategoryId;
  }

  get assigned(): UnsignedAmount {
    return this._assigned;
  }

  get activity(): SignedAmount {
    return this._activity;
  }

  get available(): SignedAmount {
    return this._available;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  private constructor(
    private readonly _id: string,
    private readonly _month: string,
    private readonly _year: string,
    private readonly _subCategoryId: string,
    private _assigned: UnsignedAmount,
    private _activity: SignedAmount,
    private _available: SignedAmount,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {
    super();
  }

  public static CREATE(
    id: string,
    month: string,
    year: string,
    subCategoryId: string,
    assigned: UnsignedAmount,
    activity: SignedAmount,
    available: SignedAmount,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new MonthlyBudget(
      id,
      month,
      year,
      subCategoryId,
      assigned,
      activity,
      available,
      createdAt,
      updatedAt,
    );
  }

  public static RETRIEVE(
    id: string,
    month: string,
    year: string,
    subCategoryId: string,
    assigned: UnsignedAmount,
    activity: SignedAmount,
    available: SignedAmount,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new MonthlyBudget(
      id,
      month,
      year,
      subCategoryId,
      assigned,
      activity,
      available,
      createdAt,
      updatedAt,
    );
  }

  private recalculateAvailable(): void {
    this._available = this._assigned.plus(this._activity);
  }

  public setAssigned(amount: UnsignedAmount) {
    this._assigned = amount;
    this.recalculateAvailable();
  }

  public incrementActivity(amount: UnsignedAmount) {
    this._activity = this._activity.plus(amount);
    this.recalculateAvailable();
  }

  public decrementActivity(amount: UnsignedAmount) {
    this._activity = this._activity.minus(amount);
    this.recalculateAvailable();
  }
}
