import { container } from 'tsyringe';
import { TransactionGetAll } from '@core/budget/transaction/application/useCase/TransactionGetAll';
import { TransactionRepository } from '@core/budget/transaction/domain/TransactionRepository';
import { AxiosTransactionRepository } from '@core/budget/transaction/infrastructure/repository/AxiosTransactionRepository';

export const registerTransactions = () => {
  container.register<TransactionRepository>('TransactionRepository', {
    useClass: AxiosTransactionRepository,
  });
  container.register<TransactionGetAll>(TransactionGetAll, {
    useClass: TransactionGetAll,
  });
};
