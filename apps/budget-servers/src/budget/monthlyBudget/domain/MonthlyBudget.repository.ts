import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';

export interface MonthlyBudgetRepository {
  assignBudget(amount: UnsignedAmount, subCategoryId: string, month: string, year: string): Promise<void>;
  createOne(monthlyBudget: MonthlyBudget): Promise<void>;
  update(monthlyBudget: MonthlyBudget): Promise<void>;
  findOne(year: string, month: string, subCategoryId: string): Promise<MonthlyBudget | undefined>;
}
