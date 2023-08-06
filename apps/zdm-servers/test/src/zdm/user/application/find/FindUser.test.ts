import { suite, test } from '@testdeck/jest';
import { UserUnitTestCase } from '../../UserUnitTestCase';
import { FindUser } from '../../../../../../src/zdm/user/application/find/FindUser';
import { FindUserHandler } from '../../../../../../src/zdm/user/application/find/FindUser.handler';
import { UserMother } from '../../domain/UserMother';
import { FindUserQueryMother } from './FindUserQueryMother';

@suite('User Find')
class FindUserTest extends UserUnitTestCase {
  private _handler: FindUserHandler;
  private _service: FindUser;

  get service(): FindUser {
    if (!this._service) {
      this._service = new FindUser(this.repository);
    }

    return this._service;
  }

  get handler(): FindUserHandler {
    if (!this._handler) {
      this._handler = new FindUserHandler(this.service);
    }

    return this._handler;
  }

  @test('it should find a user')
  it_should_find_a_user() {
    const query = FindUserQueryMother.random();
    const entity = UserMother.fromId(query.id);
    const returnValue = async () => entity;
    const returnValueMock = returnValue();
    this.repository.find.mockReturnValue(returnValueMock);
  }
}
