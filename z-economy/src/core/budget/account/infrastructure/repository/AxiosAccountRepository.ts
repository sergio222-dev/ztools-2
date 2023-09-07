import { inject, injectable } from 'tsyringe';
import * as axios_2 from 'axios';
import { AccountRepository } from '@core/budget/account/domain/AccountRepository';
import { Account } from '@core/budget/account/domain/Account';

@injectable()
export class AxiosAccountRepository implements AccountRepository {
  constructor(@inject('AxiosInstance') private axios: axios_2.AxiosInstance) {}

  async create(a: Account): Promise<void> {
    await this.axios.post<Account>('/account', a);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.axios.delete(`/account/${id}`);
    return;
  }
  async getAll(): Promise<Account[]> {
    const { data } = await this.axios.get<Account[]>('/account');

    return data;
  }

  async update(a: Account): Promise<void> {
    await this.axios.put('/account', a);
    return;
  }
}
