import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { Criteria } from '@shared/domain/criteria/Criteria';

export interface MonthlyBudgetRepository {
  assignBudget(
    amount: UnsignedAmount,
    subCategoryId: string,
    month: string,
    year: string,
    userId: string,
  ): Promise<void>;
  deleteBySubCategoryId(monthlyBudget: MonthlyBudget): Promise<void>;
  matching(criteria: Criteria): Promise<MonthlyBudget[]>;
  save(monthlyBudget: MonthlyBudget): Promise<void>;
  delete(monthlyBudget: MonthlyBudget[]): Promise<void>;
  findAllAvailableBefore(
    subCategoryId: string,
    month: string,
    year: string,
    userId: string,
  ): Promise<MonthlyBudget[]>;
  findAllByMonthYear(month: string, year: string, userId: string): Promise<MonthlyBudget[]>;
}
