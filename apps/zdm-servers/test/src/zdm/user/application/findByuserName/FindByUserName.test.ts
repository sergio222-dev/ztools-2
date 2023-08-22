import { suite, test } from '@testdeck/jest';
import { UserUnitTestCase } from '../../UserUnitTestCase';
import { FindByUserNameHandler } from '../../../../../../src/zdm/user/application/findByUserName/FindByUserName.handler';
import { FindByUserName } from '../../../../../../src/zdm/user/application/findByUserName/FindByUserName';
import { FindByUserNameResponseMother } from './FindByUerNameResponseMother';
import { UserMother } from '../../domain/UserMother';
import { FindByUserNameQuery } from '../../../../../../src/zdm/user/application/findByUserName/FindByUserName.query';

@suite('User Find')
class FindByUserNameUserTest extends UserUnitTestCase {
  private _handler: FindByUserNameHandler;
  private _service: FindByUserName;

  get service(): FindByUserName {
    if (!this._service) {
      this._service = new FindByUserName(this.repository);
    }

    return this._service;
  }

  get handler(): FindByUserNameHandler {
    if (!this._handler) {
      this._handler = new FindByUserNameHandler(this.service);
    }

    return this._handler;
  }

  @test('it should find one user by user name')
  async it_should_find_one_user_by_user_name() {
    const user = UserMother.create();
    const query = new FindByUserNameQuery(user.name.value);
    const response = FindByUserNameResponseMother.create(user.name.value);
    const returnValue = async () => user;
    const returnValueMock = returnValue();
    this.setReturnValueRepository('findByUserName', returnValueMock);

    await this.handler.execute(query);

    this.shouldFindUser(user);
    this.assertFindByUserNameResponse(response, query);
  }
}
