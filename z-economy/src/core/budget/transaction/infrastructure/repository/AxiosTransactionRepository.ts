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

  async getAllPaginated(index: number, pageSize: number): Promise<Transaction[]> {
    const { data } = await this.axios.get<Transaction[]>(`/transaction?index=${index}&pageSize=${pageSize}`);
    return data;
  }

  async getAllByAccountIdPaginated(
    accountId: string,
    index: number,
    pageSize: number,
  ): Promise<Transaction[]> {
    const { data } = await this.axios.get<Transaction[]>(
      `/transaction/account/${accountId}?index=${index}&pageSize=${pageSize}`,
    );
    return data;
  }

  async getAllByCategoryId(accountId: string): Promise<Transaction[]> {
    const { data } = await this.axios.get<Transaction[]>(`/transaction/${accountId}`);
    return data;
  }

  async create(t: Transaction): Promise<void> {
    await this.axios.post('/transaction', t);
    return;
  }

  async update(t: Transaction): Promise<void> {
    await this.axios.put('/transaction', t);
    return;
  }

  async delete(t: Transaction): Promise<void> {
    return this.axios.delete(`/transaction/${t.id}`);
  }

  async deleteBatch(t: { ids: string[] }): Promise<void> {
    return this.axios.post('/transaction/delete', t);
  }
}
