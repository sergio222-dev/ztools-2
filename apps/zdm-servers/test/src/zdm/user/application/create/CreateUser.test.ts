import { suite, test } from '@testdeck/jest';
import { UserMother } from '../../domain/UserMother';
import { UserUnitTestCase } from '../../UserUnitTestCase';
import { CreateUserCommandMother } from './CreateUserCommandMother';
import { CreateUserHandler } from '../../../../../../src/zdm/user/application/create/CreateUser.handler';
import { CreateUser } from '../../../../../../src/zdm/user/application/create/CreateUser';

@suite('User create unit test case')
export class CreateUserTest extends UserUnitTestCase {
  private _handler: CreateUserHandler;
  private _service: CreateUser;

  get service(): CreateUser {
    if (!this._service) {
      this._service = new CreateUser(this.repository);
    }

    return this._service;
  }

  get handler(): CreateUserHandler {
    if (!this._handler) {
      this._handler = new CreateUserHandler(this.service);
    }

    return this._handler;
  }

  @test('should create user')
  it_should_create_user() {
    const command = CreateUserCommandMother.random();
    const user = UserMother.fromCommand(command);

    void this.handler.execute(command);
    this.shouldSaved(user);
  }
}
