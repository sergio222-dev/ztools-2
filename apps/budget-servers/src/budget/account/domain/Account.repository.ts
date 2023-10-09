import { Account } from '@budget/account/domain/Account.aggregate';
import { Criteria } from '@shared/domain/criteria/Criteria';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  delete(accounts: Account[]): Promise<void>;
  matching(criteria: Criteria): Promise<Account[]>;
}
