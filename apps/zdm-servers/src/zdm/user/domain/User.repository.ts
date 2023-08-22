import { User } from '@zdm/user/domain/User.aggregate';
import { SimpleRepository } from '@shared/domain/aggregate/SimpleRepository';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';

export interface UserRepository extends SimpleRepository<User> {
  findByUserName(userName: StringValueObject): Promise<User | undefined>;
}
