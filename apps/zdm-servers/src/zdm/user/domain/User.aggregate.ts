import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { DateValueObject } from '@shared/domain/valueObject/DateValueObject';
import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';

export class User extends AggregateRoot {
  get name(): StringValueObject {
    return this._name;
  }

  get email(): StringValueObject {
    return this._email;
  }

  get password(): StringValueObject {
    return this._password;
  }

  constructor(
    _id: IdObject,
    private readonly _name: StringValueObject,
    private readonly _email: StringValueObject,
    private readonly _password: StringValueObject,
    _createdAt: DateValueObject,
    _updatedAt: DateValueObject,
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  static CREATE(
    id: IdObject,
    name: StringValueObject,
    email: StringValueObject,
    password: StringValueObject,
  ) {
    return new User(
      id,
      name,
      email,
      password,
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
    );
  }

  static RETRIEVE(
    id: IdObject,
    name: StringValueObject,
    email: StringValueObject,
    password: StringValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    return new User(id, name, email, password, createdAt, updatedAt);
  }
}
