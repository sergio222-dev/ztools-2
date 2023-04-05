import useSWR from 'swr';
import { container } from 'tsyringe';
import { TransactionGetAll } from '@core/budget/transactions/application/useCase/TransactionGetAll';

export const useTransaction = () => {
  const transactionGetAll = container.resolve(TransactionGetAll);
  const { data, error, isLoading } = useSWR(['transactions', {}], () => transactionGetAll.execute());
  // console.log('render', data);
  return {
    data,
    error,
    isLoading,
  };
};
