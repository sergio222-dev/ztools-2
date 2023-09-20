import { Transaction } from '@core/budget/transaction/domain/Transaction';

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
  getAllByCategoryId(accountId: string): Promise<Transaction[]>;
  save(t: Transaction): Promise<void>;
  update(t: Transaction): Promise<void>;
  delete(t: Transaction): Promise<void>;
  deleteBatch(t: { ids: string[] }): Promise<void>;
}
