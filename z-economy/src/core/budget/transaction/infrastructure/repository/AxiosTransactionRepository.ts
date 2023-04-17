import { inject, injectable } from 'tsyringe';
import type { AxiosInstance } from 'axios';
import type { TransactionRepository } from '@core/budget/transaction/domain/TransactionRepository';
import { Transaction } from '@core/budget/transaction/domain/Transaction';

@injectable()
export class AxiosTransactionRepository implements TransactionRepository {
  constructor(@inject('AxiosInstance') private axios: AxiosInstance) {}

  async getAll(): Promise<Transaction[]> {
    const { data } = await this.axios.get<Transaction[]>('/transaction');

    return data;
  }

  async save(transaction: Transaction): Promise<void> {
    await this.axios.post('/transaction', transaction);
    return;
  }

  async update(transaction: Transaction): Promise<void> {
    await this.axios.put('/transaction', transaction);
    return;
  }
}
