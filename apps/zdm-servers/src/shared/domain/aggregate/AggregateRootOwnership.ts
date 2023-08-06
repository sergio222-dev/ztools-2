import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { DateValueObject } from '@shared/domain/valueObject/DateValueObject';

export abstract class AggregateRootOwnership extends AggregateRoot {
  get user_id(): IdObject {
    return this._user_id;
  }

  protected constructor(
    id: IdObject,
    protected readonly _user_id: IdObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }
}
