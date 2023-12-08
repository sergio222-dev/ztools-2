import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { AggregateRootOwnership } from '@shared/domain/aggregate/AggregateRootOwnership';

export class AssignBudget extends AggregateRootOwnership {
  private constructor(
    _id: string,
    private readonly _month: string,
    private readonly _year: string,
    private readonly _subCategoryId: string,
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
    available: SignedAmount,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new AssignBudget(id, month, year, subCategoryId, available, userId, createdAt, updatedAt);
  }

  public static RETRIEVE(
    id: string,
    month: string,
    year: string,
    subCategoryId: string,
    available: SignedAmount,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new AssignBudget(id, month, year, subCategoryId, available, userId, createdAt, updatedAt);
  }

  public decrementAvailable(amount: SignedAmount) {
    this._available = this._available.minus(amount);
  }

  public incrementAvailable(amount: SignedAmount) {
    this._available = this._available.plus(amount);
  }
}
