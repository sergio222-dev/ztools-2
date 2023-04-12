import * as axios from 'axios';
import { container } from 'tsyringe';
import { AxiosInstance } from '@core/shared/infrastructure/Axios/instance';
import { registerTransactions } from '@core/budget/transaction/infrastructure/DI/registry';
import { registerBudget } from '@core/budget/budget/infrastructure/DI/registry';

export function buildContainer() {
  // repository
  container.register<axios.AxiosInstance>('AxiosInstance', {
    useValue: AxiosInstance,
  });

  // Transactions
  registerTransactions();

  // Budget
  registerBudget();
}
