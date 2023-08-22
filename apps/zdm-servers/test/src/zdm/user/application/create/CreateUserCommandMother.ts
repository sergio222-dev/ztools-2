import { IdMother } from '../../../../shared/domain/IdMother';
import { StringMother } from '../../../../shared/domain/StringMother';
import { CreateUserCommand } from '../../../../../../src/zdm/user/application/create/CreateUser.command';

export class CreateUserCommandMother {
  public static random(): CreateUserCommand {
    return {
      id: IdMother.random(),
      name: StringMother.random(),
      email: StringMother.random(),
      password: StringMother.random(),
    };
  }
}
