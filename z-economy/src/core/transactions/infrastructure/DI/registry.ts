import { container } from 'tsyringe';
import { TransactionGetAll } from '@core/transactions/application/useCase/TransactionGetAll';
import { TransactionRepository } from '@core/transactions/domain/TransactionRepository';
import { AxiosTransactionRepository } from '@core/transactions/infrastructure/repository/AxiosTransactionRepository';

export const registerTransactions = () => {
  container.register<TransactionGetAll>(TransactionGetAll, {
    useClass: TransactionGetAll,
  });
  container.register<TransactionRepository>('TransactionRepository', {
    useClass: AxiosTransactionRepository,
  });
};
