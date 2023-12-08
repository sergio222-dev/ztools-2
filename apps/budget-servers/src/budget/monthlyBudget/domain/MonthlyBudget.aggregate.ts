import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { AggregateRootOwnership } from '@shared/domain/aggregate/AggregateRootOwnership';

export class MonthlyBudget extends AggregateRootOwnership {
  get month(): string {
    return this._month;
  }

  get year(): string {
    return this._year;
  }

  get subCategoryId(): string {
    return this._subCategoryId;
  }

  get isAssignBudget(): boolean {
    return this._isAssignBudget;
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

  private constructor(
    _id: string,
    private readonly _month: string,
    private readonly _year: string,
    private readonly _subCategoryId: string,
    private readonly _isAssignBudget: boolean,
    private _assigned: UnsignedAmount,
    private _activity: SignedAmount,
    private _available: SignedAmount,
    _userId: string,
    _createdAt: Date,
    _updatedAt: Date,
  ) {
    super(_id, _userId, _createdAt, _updatedAt);
  }

  public static CREATE(
    id: string,
    month: string,
    year: string,
    subCategoryId: string,
    isAssignBudget: boolean,
    assigned: UnsignedAmount,
    activity: SignedAmount,
    available: SignedAmount,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new MonthlyBudget(
      id,
      month,
      year,
      subCategoryId,
      isAssignBudget,
      assigned,
      activity,
      available,
      userId,
      createdAt,
      updatedAt,
    );
  }

  public static RETRIEVE(
    id: string,
    month: string,
    year: string,
    subCategoryId: string,
    isAssignBudget: boolean,
    assigned: UnsignedAmount,
    activity: SignedAmount,
    available: SignedAmount,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new MonthlyBudget(
      id,
      month,
      year,
      subCategoryId,
      isAssignBudget,
      assigned,
      activity,
      available,
      userId,
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

  public setAvailable(amount: UnsignedAmount) {
    this._available = amount;
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
