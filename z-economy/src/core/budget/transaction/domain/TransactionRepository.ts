import { Transaction } from '@core/budget/transaction/domain/Transaction';

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
  getAllPaginated(index: number, pageSize: number): Promise<Transaction[]>;
  create(t: Transaction): Promise<void>;
  delete(t: Transaction): Promise<void>;
  update(t: Transaction): Promise<void>;
  getAllByCategoryId(accountId: string): Promise<Transaction[]>;
  deleteBatch(t: { ids: string[] }): Promise<void>;
}
