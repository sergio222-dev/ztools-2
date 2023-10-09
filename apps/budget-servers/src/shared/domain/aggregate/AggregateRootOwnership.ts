import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';

export abstract class AggregateRootOwnership extends AggregateRoot {
  get userId(): string {
    return this._user_id;
  }
  protected constructor(
    _id: string,
    protected readonly _user_id: string,
    _createdAt: Date,
    _updatedAt: Date,
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  static isAggregateRootOwnership(
    subject: AggregateRootOwnership | AggregateRoot,
  ): subject is AggregateRootOwnership {
    return subject['userId'] !== undefined;
  }
}
