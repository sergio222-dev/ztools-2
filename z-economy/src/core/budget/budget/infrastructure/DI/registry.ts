import { container } from 'tsyringe';
import { BudgetRepository } from '@core/budget/budget/domain/BudgetRepository';
import { AxiosBudgetRepository } from '@core/budget/budget/infrastructure/repository/AxiosBudgetRepository';
import { BudgetGetAll } from '@core/budget/budget/application/useCase/BudgetGetAll';
import { BudgetGet } from '@core/budget/budget/application/useCase/BudgetGet';
export const registerBudget = () => {
  container.register<BudgetRepository>('BudgetRepository', {
    useClass: AxiosBudgetRepository,
  });
  container.register<BudgetGetAll>(BudgetGetAll, {
    useClass: BudgetGetAll,
  });
  container.register<BudgetGet>(BudgetGet, {
    useClass: BudgetGet,
  });
};
