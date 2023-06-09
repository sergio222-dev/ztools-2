import { inject, injectable } from 'tsyringe';
import * as axios_1 from 'axios';
import { CategoryRepository } from '@core/budget/budget/domain/CategoryRepository';
import { Category } from '@core/budget/budget/domain/Category';

@injectable()
export class AxiosBudgetRepository implements CategoryRepository {
  constructor(@inject('AxiosInstance') private axios: axios_1.AxiosInstance) {}

  async get(id: string): Promise<Category> {
    const { data } = await this.axios.get<Category>(`/category/${id}`);

    return data;
  }

  async getAll(): Promise<Category[]> {
    const { data } = await this.axios.get<Category[]>('/category');

    return data;
  }
}
