import { Transaction } from './Transaction.aggregate';

export interface TransactionRepository {
  findAll(): Promise<Transaction[]>;
  findOneById(id: string): Promise<Transaction>;
  findAllByAccountId(id: string): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<void>;
  update(transaction: Transaction): Promise<void>;
  delete(id: string): Promise<void>;
  deleteBatch(ids: string[]): Promise<void>;
}
