import { inject, injectable } from 'tsyringe';
import * as axios_1 from 'axios';
import { CategoryRepository } from '@core/budget/category/domain/CategoryRepository';
import { Category } from '@core/budget/category/domain/Category';
import { SubCategoryBudget } from '@core/budget/category/domain/SubCategoryBudget';
import { SubCategory } from '@core/budget/category/domain/SubCategory';

@injectable()
export class AxiosBudgetRepository implements CategoryRepository {
  constructor(@inject('AxiosInstance') private axios: axios_1.AxiosInstance) {}

  async create(c: Category): Promise<void> {
    await this.axios.post<Category>(`/category/`, c);
  }

  async createSubCategory(c: SubCategory): Promise<void> {
    await this.axios.post<SubCategory>('/subCategory/', c);
  }

  async deleteSubCategory(id: string) {
    await this.axios.delete(`/subCategory/${id}`);
  }

  async getAll(month: string, year: string): Promise<Category[]> {
    const { data } = await this.axios.get<Category[]>(`/category?month=${month}&year=${year}`);

    return data;
  }

  async assignSubCategoryBudget(b: SubCategoryBudget) {
    await this.axios.post('/subCategory/assign', b);
  }

  async deleteCategory(id: string) {
    await this.axios.delete(`/category/${id}`);
  }
}
