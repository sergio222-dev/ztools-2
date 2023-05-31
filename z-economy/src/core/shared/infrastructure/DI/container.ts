import * as axios from 'axios';
import { container } from 'tsyringe';
import { AxiosInstance } from '@core/shared/infrastructure/Axios/instance';
import { TransactionRepository } from '@core/budget/transaction/domain/TransactionRepository';
import { AxiosTransactionRepository } from '@core/budget/transaction/infrastructure/repository/AxiosTransactionRepository';
import { BudgetRepository } from '@core/budget/budget/domain/BudgetRepository';
import { AxiosBudgetRepository } from '@core/budget/budget/infrastructure/repository/AxiosBudgetRepository';

export function buildContainer() {
  // repository
  container.register<axios.AxiosInstance>('AxiosInstance', {
    useValue: AxiosInstance,
  });

  // Implementation
  axiosImplementation();
}

function axiosImplementation() {
  container.register<TransactionRepository>('TransactionRepository', {
    useClass: AxiosTransactionRepository,
  });
  container.register<BudgetRepository>('BudgetRepository', {
    useClass: AxiosBudgetRepository,
  });
}
