import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '@shared/domain/valueObject/StringUndefinedValueObject';
import { DateValueObject } from '@shared/domain/valueObject/DateValueObject';
import { AggregateRootOwnership } from '@shared/domain/aggregate/AggregateRootOwnership';

export class EntityObject extends AggregateRootOwnership {
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
    _id: IdObject,
    private readonly _name: StringValueObject,
    private readonly _entity_id: StringValueObject,
    private readonly _description: StringUndefinedValueObject,
    private readonly _image_link: StringUndefinedValueObject,
    _user_id: IdObject,
    _createdAt: DateValueObject,
    _updatedAt: DateValueObject,
  ) {
    super(_id, _user_id, _createdAt, _updatedAt);
  }

  static CREATE(
    id: IdObject,
    name: StringValueObject,
    entity_id: StringValueObject,
    description: StringUndefinedValueObject,
    image_link: StringUndefinedValueObject,
    _user_id: IdObject,
    _createdAt: DateValueObject,
    _updatedAt: DateValueObject,
  ) {
    return new EntityObject(
      id,
      name,
      entity_id,
      description,
      image_link,
      _user_id,
      _createdAt,
      _updatedAt,
    );
  }

  static RETRIEVE(
    id: IdObject,
    name: StringValueObject,
    entity_id: StringValueObject,
    description: StringUndefinedValueObject,
    image_link: StringUndefinedValueObject,
    _user_id: IdObject,
    _createdAt: DateValueObject,
    _updatedAt: DateValueObject,
  ) {
    return new EntityObject(
      id,
      name,
      entity_id,
      description,
      image_link,
      _user_id,
      _createdAt,
      _updatedAt,
    );
  }
}
