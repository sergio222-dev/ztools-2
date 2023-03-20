import { container } from 'tsyringe';
import * as axios from 'axios';
import { AxiosInstance } from '@core/shared/infrastructure/Axios/instance';
import { registerTransactions } from '@core/transactions/infrastructure/DI/registry';

export function buildContainer() {
  // repository
  container.register<axios.AxiosInstance>('AxiosInstance', {
    useValue: AxiosInstance,
  });

  // Transactions
  registerTransactions();
}
