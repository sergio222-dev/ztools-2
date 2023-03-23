import { Budget } from '@core/budget/budget/domain/Budget';

export interface BudgetRepository {
  getAll(): Promise<Budget[]>;

  get(id: string): Promise<Budget>;
}
