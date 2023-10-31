import { inject, injectable } from 'tsyringe';
import * as axios_1 from 'axios';
import { CategoryRepository } from '@core/budget/category/domain/CategoryRepository';
import { Category } from '@core/budget/category/domain/Category';
import { SubCategoryBudget } from '@core/budget/category/domain/SubCategoryBudget';
import { SubCategory } from '@core/budget/category/domain/SubCategory';
import { CategoryDeleteRequest } from '@core/budget/category/domain/CategoryDeleteRequest';
import { CategoryAnalytics } from '@core/budget/category/domain/CategoryAnalytics';

@injectable()
export class AxiosBudgetRepository implements CategoryRepository {
  constructor(@inject('AxiosInstance') private axios: axios_1.AxiosInstance) {}

  async create(c: Category): Promise<void> {
    await this.axios.post<Category>(`/category/`, c);
  }

  async update(c: Category): Promise<void> {
    await this.axios.put<Category>(`/category/`, c);
  }

  async createSubCategory(c: SubCategory): Promise<void> {
    await this.axios.post<SubCategory>('/subCategory/', c);
  }

  async updateSubCategory(c: SubCategory): Promise<void> {
    await this.axios.put<SubCategory>('/subCategory/', c);
  }

  async deleteSubCategory(ids: CategoryDeleteRequest) {
    await this.axios.post(`/subCategory/delete`, ids);
  }

  async getAll(month: string, year: string): Promise<Category[]> {
    const { data } = await this.axios.get<Category[]>(`/category?month=${month}&year=${year}`);

    return data;
  }

  async assignSubCategoryBudget(b: SubCategoryBudget) {
    await this.axios.post('/subCategory/assign', b);
  }

  async deleteCategory(ids: CategoryDeleteRequest) {
    await this.axios.post(`/category/delete`, ids);
  }

  async getAnalyticsData(): Promise<CategoryAnalytics[]> {
    const { data } = await new Promise<{ data: CategoryAnalytics[] }>(resolve => {
      return resolve({
        data: [
          {
            categoryName: 'Salamin',
            totalInflow: '2500000',
            totalOutflow: '500000',
          },
          {
            categoryName: 'Salamin2',
            totalInflow: '2500000',
            totalOutflow: '200000',
          },
          {
            categoryName: 'Salamin3',
            totalInflow: '2500000',
            totalOutflow: '10000',
          },
          {
            categoryName: 'Salamin4',
            totalInflow: '2500000',
            totalOutflow: '100000',
          },
          {
            categoryName: 'Salamin5',
            totalInflow: '2500000',
            totalOutflow: '1000',
          },
        ],
      });
    });
    return data;
  }
}
