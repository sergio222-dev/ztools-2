import { TransactionRepository } from '@core/transactions/domain/TransactionRepository';
import { Transaction } from '@core/transactions/domain/Transaction';
import { inject, injectable } from 'tsyringe';
import * as axios_1 from 'axios';

@injectable()
export class AxiosTransactionRepository implements TransactionRepository {
  constructor(@inject('AxiosInstance') private axios: axios_1.AxiosInstance) {}

  async getAll(): Promise<Transaction[]> {
    const { data } = await this.axios.get<Transaction[]>('/transactions/all');

    return data;
  }
}
