import { Transaction } from './Transaction.aggregate';
import { Criteria } from '@shared/domain/criteria/Criteria';

export interface TransactionRepository {
  save(value: Transaction): Promise<void>;
  delete(transactions: Transaction[]): Promise<void>;
  matching(criteria: Criteria): Promise<Transaction[]>;
}
