import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '@shared/domain/valueObject/StringUndefinedValueObject';

export class EntityObject extends AggregateRoot {
  get id(): IdObject {
    return this._id;
  }

  get name(): StringValueObject {
    return this._name;
  }

  get entity_id(): StringValueObject {
    return this._entity_id;
  }

  get description(): StringUndefinedValueObject {
    return this._description;
  }

  get image_link(): StringUndefinedValueObject {
    return this._image_link;
  }

  private constructor(
    private readonly _id: IdObject,
    private readonly _name: StringValueObject,
    private readonly _entity_id: StringValueObject,
    private readonly _description: StringUndefinedValueObject,
    private readonly _image_link: StringUndefinedValueObject,
  ) {
    super();
  }

  static CREATE(
    id: IdObject,
    name: StringValueObject,
    entity_id: StringValueObject,
    description: StringUndefinedValueObject,
    image_link: StringUndefinedValueObject,
  ) {
    return new EntityObject(id, name, entity_id, description, image_link);
  }

  static RETRIEVE(
    id: IdObject,
    name: StringValueObject,
    entity_id: StringValueObject,
    description: StringUndefinedValueObject,
    image_link: StringUndefinedValueObject,
  ) {
    return new EntityObject(id, name, entity_id, description, image_link);
  }
}
