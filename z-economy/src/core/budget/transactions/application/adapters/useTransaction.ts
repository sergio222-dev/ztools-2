import useSWR from 'swr';
import { container } from 'tsyringe';
import { TransactionGetAll } from '@core/budget/transactions/application/useCase/TransactionGetAll';

export const useTransaction = () => {
  const transactionGetAll = container.resolve(TransactionGetAll);
  const { data, error } = useSWR(['transactions', {}], () => transactionGetAll.execute());

  return {
    data,
    error,
  };
};
