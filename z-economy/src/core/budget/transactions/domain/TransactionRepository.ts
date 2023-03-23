import { Transaction } from '@core/budget/transactions/domain/Transaction';

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
}
