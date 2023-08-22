import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '@shared/domain/valueObject/StringUndefinedValueObject';
import { DateValueObject } from '@shared/domain/valueObject/DateValueObject';
import { AggregateRootOwnership } from '@shared/domain/aggregate/AggregateRootOwnership';
import { NumberValueObject } from '@shared/domain/valueObject/NumberValueObject';

export class Entity extends AggregateRootOwnership {
  get parent_id(): StringUndefinedValueObject {
    return this._parent_id;
  }

  get name(): StringValueObject {
    return this._name;
  }

  get order(): NumberValueObject {
    return this._order;
  }

  get description(): StringUndefinedValueObject {
    return this._description;
  }
  private constructor(
    _id: IdObject,
    private readonly _name: StringValueObject,
    private readonly _order: NumberValueObject,
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
    order: NumberValueObject,
    description: StringUndefinedValueObject,
    parent_id: StringUndefinedValueObject,
    user_id: IdObject,
    created_at: DateValueObject,
    updated_at: DateValueObject,
  ): Entity {
    return new Entity(
      id,
      name,
      order,
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
    order: NumberValueObject,
    description: StringUndefinedValueObject,
    parent_id: StringUndefinedValueObject,
    user_id: IdObject,
    created_at: DateValueObject,
    updated_at: DateValueObject,
  ): Entity {
    return new Entity(
      id,
      name,
      order,
      description,
      parent_id,
      user_id,
      created_at,
      updated_at,
    );
  }
}
