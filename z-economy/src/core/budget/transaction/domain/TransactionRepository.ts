import { Transaction } from '@core/budget/transaction/domain/Transaction';

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
  save(t: Transaction): Promise<void>;
}
