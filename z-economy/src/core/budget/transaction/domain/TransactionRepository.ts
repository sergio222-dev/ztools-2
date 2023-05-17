import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { Row } from '@tanstack/react-table';

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
  save(t: Transaction): Promise<void>;
  update(t: Transaction): Promise<void>;
  delete(t: Transaction): Promise<void>;
  deleteBatch(t: { ids: string[] }): Promise<void>;
}
