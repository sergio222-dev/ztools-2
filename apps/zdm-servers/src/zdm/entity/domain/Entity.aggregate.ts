import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '@shared/domain/valueObject/StringUndefinedValueObject';

export class Entity extends AggregateRoot {
  get parent_id(): StringUndefinedValueObject {
    return this._parent_id;
  }
  get id(): IdObject {
    return this._id;
  }

  get name(): StringValueObject {
    return this._name;
  }

  get description(): StringUndefinedValueObject {
    return this._description;
  }
  private constructor(
    private readonly _id: IdObject,
    private readonly _name: StringValueObject,
    private readonly _description: StringUndefinedValueObject,
    private readonly _parent_id: StringUndefinedValueObject,
  ) {
    super();
  }

  static CREATE(
    id: IdObject,
    name: StringValueObject,
    description: StringUndefinedValueObject,
    parent_id: StringUndefinedValueObject,
  ): Entity {
    return new Entity(id, name, description, parent_id);
  }

  static RETRIEVE(
    id: IdObject,
    name: StringValueObject,
    description: StringUndefinedValueObject,
    parent_id: StringUndefinedValueObject,
  ): Entity {
    return new Entity(id, name, description, parent_id);
  }
}
