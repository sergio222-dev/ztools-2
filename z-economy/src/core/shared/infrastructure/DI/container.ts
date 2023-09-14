import * as axios from 'axios';
import { container } from 'tsyringe';
import { AxiosInstance } from '@core/shared/infrastructure/Axios/instance';
import { TransactionRepository } from '@core/budget/transaction/domain/TransactionRepository';
import { AxiosTransactionRepository } from '@core/budget/transaction/infrastructure/repository/AxiosTransactionRepository';
import { CategoryRepository } from '@core/budget/category/domain/CategoryRepository';
import { AxiosBudgetRepository } from '@core/budget/category/infrastructure/repository/AxiosBudgetRepository';
import { AxiosAccountRepository } from '@core/budget/account/infrastructure/repository/AxiosAccountRepository';
import { AccountRepository } from '@core/budget/account/domain/AccountRepository';

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
  container.register<CategoryRepository>('CategoryRepository', {
    useClass: AxiosBudgetRepository,
  });
  container.register<AccountRepository>('AccountRepository', {
    useClass: AxiosAccountRepository,
  });
}
