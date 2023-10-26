import { User } from '@budget/user/domain/User.aggregate';

export interface UserRepository {
  findOneById(id: string): Promise<User>;
}
