import { Transaction } from './Transaction';

export interface TransactionRepository {
  findAll(): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<void>;
}
