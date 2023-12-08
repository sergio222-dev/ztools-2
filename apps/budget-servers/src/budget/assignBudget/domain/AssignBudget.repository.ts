import { AssignBudget } from '@budget/assignBudget/domain/AssignBudget.aggregate';

export interface AssignBudgetRepository {
  save(assignBudget: AssignBudget): Promise<void>;
  delete(assignBudget: AssignBudget[]): Promise<void>;
  // matching(criteria: Criteria): Promise<AssignBudget[]>;
  findByMonthYear(month: string, year: string, userId: string): Promise<AssignBudget>;
}
