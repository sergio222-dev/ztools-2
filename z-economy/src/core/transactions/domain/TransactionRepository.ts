import { Transaction } from '@core/transactions/domain/Transaction';

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
}
