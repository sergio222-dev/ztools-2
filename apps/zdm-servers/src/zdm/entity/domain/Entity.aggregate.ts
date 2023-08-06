import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '@shared/domain/valueObject/StringUndefinedValueObject';
import { DateValueObject } from '@shared/domain/valueObject/DateValueObject';
import { AggregateRootOwnership } from '@shared/domain/aggregate/AggregateRootOwnership';

export class Entity extends AggregateRootOwnership {
  get parent_id(): StringUndefinedValueObject {
    return this._parent_id;
  }

  get name(): StringValueObject {
    return this._name;
  }

  get description(): StringUndefinedValueObject {
    return this._description;
  }
  private constructor(
    _id: IdObject,
    private readonly _name: StringValueObject,
    private readonly _description: StringUndefinedValueObject,
    private readonly _parent_id: StringUndefinedValueObject,
    _userId: IdObject,
    _createdAt: DateValueObject,
    _updatedAt: DateValueObject,
  ) {
    super(_id, _userId, _createdAt, _updatedAt);
  }

  static CREATE(
    id: IdObject,
    name: StringValueObject,
    description: StringUndefinedValueObject,
    parent_id: StringUndefinedValueObject,
    user_id: IdObject,
    created_at: DateValueObject,
    updated_at: DateValueObject,
  ): Entity {
    return new Entity(
      id,
      name,
      description,
      parent_id,
      user_id,
      created_at,
      updated_at,
    );
  }

  static RETRIEVE(
    id: IdObject,
    name: StringValueObject,
    description: StringUndefinedValueObject,
    parent_id: StringUndefinedValueObject,
    user_id: IdObject,
    created_at: DateValueObject,
    updated_at: DateValueObject,
  ): Entity {
    return new Entity(
      id,
      name,
      description,
      parent_id,
      user_id,
      created_at,
      updated_at,
    );
  }
}
