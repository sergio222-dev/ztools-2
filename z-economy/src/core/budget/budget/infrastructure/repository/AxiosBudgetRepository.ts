import { inject, injectable } from 'tsyringe';
import * as axios_1 from 'axios';
import { CategoryRepository } from '@core/budget/budget/domain/CategoryRepository';
import { Category } from '@core/budget/budget/domain/Category';

@injectable()
export class AxiosBudgetRepository implements CategoryRepository {
  constructor(@inject('AxiosInstance') private axios: axios_1.AxiosInstance) {}

  async create(c: Category): Promise<void> {
    await this.axios.post<Category>(`/category/`, c);
  }

  async getAll(month: string, year: string): Promise<Category[]> {
    const { data } = await this.axios.get<Category[]>(`/category?month=${month}&year=${year}`);

    return data;
  }
}
