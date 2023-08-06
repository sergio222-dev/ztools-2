import { UnitTestCase } from '../../shared/infrastructure/UnitTestCase';
import { IgnoreRecordType } from '../../shared/domain/utils';
import { UserRepository } from '../../../../src/zdm/user/domain/User.repository';
import { User } from '../../../../src/zdm/user/domain/User.aggregate';
import { MockProxy } from 'jest-mock-extended';

export abstract class UserUnitTestCase extends UnitTestCase {
  private _repository: UserRepository & MockProxy<UserRepository>;

  get repository(): UserRepository & MockProxy<UserRepository> {
    if (!this._repository) {
      this._repository = this.mock<UserRepository>();
    }

    return this._repository;
  }

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

  shouldReturnEntity(entity: User, result: User) {
    expect(this.repository.find).toBeCalledTimes(1);
    expect(this.repository.find).toBeCalledWith(entity.id);
    expect(result).toBe(entity);
  }
}
