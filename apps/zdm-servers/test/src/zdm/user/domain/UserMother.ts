import { StringValueObject } from '../../../../../src/shared/domain/valueObject/StringValueObject';
import { IdObject } from '../../../../../src/shared/domain/valueObject/IdObject';
import { CreateUserCommand } from '../../../../../src/zdm/user/application/create/CreateUser.command';
import { User } from '../../../../../src/zdm/user/domain/User.aggregate';
import { StringMother } from '../../../shared/domain/StringMother';
import { IdMother } from '../../../shared/domain/IdMother';
import { QuantityMother } from '../../../shared/domain/QuantityMother';

export class UserMother {
  public static create() {
    return User.CREATE(
      new IdObject(IdMother.random()),
      new StringValueObject(StringMother.random()),
      new StringValueObject(StringMother.random()),
      new StringValueObject(StringMother.random()),
    );
  }

  public static fromCommand(command: CreateUserCommand) {
    return User.CREATE(
      new IdObject(command.id),
      new StringValueObject(command.name),
      new StringValueObject(command.email),
      new StringValueObject(command.password),
    );
  }

  public static fromUserName(userName: string) {
    return User.CREATE(
      new IdObject(StringMother.random()),
      new StringValueObject(userName),
      new StringValueObject(StringMother.random()),
      new StringValueObject(StringMother.random()),
    );
  }

  static fromId(id) {
    return User.CREATE(
      new IdObject(id),
      new StringValueObject(StringMother.random()),
      new StringValueObject(IdMother.random()),
      new StringValueObject(StringMother.random()),
    );
  }
}
