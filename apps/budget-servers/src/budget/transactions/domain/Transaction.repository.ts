import { Transaction } from './Transaction';

export interface TransactionRepository {
  findAll(): Promise<Transaction[]>;
}
