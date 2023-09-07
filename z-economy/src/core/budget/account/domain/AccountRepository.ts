import { Account } from '@core/budget/account/domain/Account';

export interface AccountRepository {
  getAll(): Promise<Account[]>;
  create(a: Account): Promise<void>;
  delete(id: string): Promise<void>;
  update(a: Account): Promise<void>;
}
