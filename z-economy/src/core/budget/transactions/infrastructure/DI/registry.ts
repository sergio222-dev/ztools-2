import { container } from 'tsyringe';
import { TransactionGetAll } from '@core/budget/transactions/application/useCase/TransactionGetAll';
import { TransactionRepository } from '@core/budget/transactions/domain/TransactionRepository';
import { AxiosTransactionRepository } from '@core/budget/transactions/infrastructure/repository/AxiosTransactionRepository';

export const registerTransactions = () => {
  container.register<TransactionRepository>('TransactionRepository', {
    useClass: AxiosTransactionRepository,
  });
  container.register<TransactionGetAll>(TransactionGetAll, {
    useClass: TransactionGetAll,
  });
};
