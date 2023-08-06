import { StringValueObject } from '../../../../../src/shared/domain/valueObject/StringValueObject';
import { IdObject } from '../../../../../src/shared/domain/valueObject/IdObject';
import { CreateUserCommand } from '../../../../../src/zdm/user/application/create/CreateUser.command';
import { User } from '../../../../../src/zdm/user/domain/User.aggregate';
import { StringMother } from '../../../shared/domain/StringMother';
import { IdMother } from '../../../shared/domain/IdMother';

export class UserMother {
  public static fromCommand(command: CreateUserCommand) {
    return User.CREATE(
      new IdObject(command.id),
      new StringValueObject(command.name),
      new StringValueObject(command.email),
      new StringValueObject(command.password),
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
