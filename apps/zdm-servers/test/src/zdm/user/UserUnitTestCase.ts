import { UnitTestCase } from '../../shared/infrastructure/UnitTestCase';
import { IgnoreRecordType } from '../../shared/domain/utils';
import { UserRepository } from '../../../../src/zdm/user/domain/User.repository';
import { User } from '../../../../src/zdm/user/domain/User.aggregate';
import { FindByUserNameResponse } from '../../../../src/zdm/user/application/findByUserName/FindByUserNameResponse';
import { FindByUserNameQuery } from '../../../../src/zdm/user/application/findByUserName/FindByUserName.query';

export abstract class UserUnitTestCase extends UnitTestCase<
  User,
  UserRepository
> {
  shouldSaved(entity: User) {
    expect(this.repository.save).toBeCalledTimes(1);
    expect(this.repository.save).toBeCalledWith(
      expect.objectContaining<IgnoreRecordType<User>>({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
      }),
    );
  }

  assertUser(user: User, subject: User) {
    expect(user).toBe(
      expect.objectContaining<IgnoreRecordType<User>>({
        id: subject.id,
        name: subject.name,
        email: subject.email,
        password: subject.password,
      }),
    );
  }

  shouldFindUser(user: User) {
    expect(this.repository.findByUserName).toBeCalledTimes(1);
    expect(this.repository.findByUserName).toBeCalledWith(user.name);
  }

  assertFindByUserNameResponse(
    response: FindByUserNameResponse,
    query: FindByUserNameQuery,
  ) {
    expect(response.name).toBe(query.username);
  }
}
