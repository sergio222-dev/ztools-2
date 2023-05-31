import { inject, injectable } from 'tsyringe';
import * as axios_1 from 'axios';
import { BudgetRepository } from '@core/budget/budget/domain/BudgetRepository';
import { Budget } from '@core/budget/budget/domain/Category';

@injectable()
export class AxiosBudgetRepository implements BudgetRepository {
  constructor(@inject('AxiosInstance') private axios: axios_1.AxiosInstance) {}

  async get(id: string): Promise<Budget> {
    const { data } = await this.axios.get<Budget>(`/budget/${id}`);

    return data;
  }

  async getAll(): Promise<Budget[]> {
    const { data } = await this.axios.get<Budget[]>('/budget/all');

    return data;
  }
}
