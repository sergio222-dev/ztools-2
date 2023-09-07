import { Account } from '@budget/account/domain/Account.aggregate';

export interface AccountRepository {
  createOne(account: Account): Promise<void>;
  findOneById(id: string): Promise<Account | undefined>;
  findAll(): Promise<Account[]>;
  update(account: Account): Promise<void>;
  delete(id: string): Promise<void>;
}
