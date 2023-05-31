import { Budget } from '@core/budget/budget/domain/Category';

export interface BudgetRepository {
  getAll(): Promise<Budget[]>;

  get(id: string): Promise<Budget>;
}
