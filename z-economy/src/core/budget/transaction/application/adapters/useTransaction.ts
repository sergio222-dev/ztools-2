import useSWR from 'swr';
import { container } from 'tsyringe';
import { TransactionGetAll } from '@core/budget/transaction/application/useCase/TransactionGetAll';
import { Transaction } from '@core/budget/transaction/domain/Transaction';

export const useTransaction = () => {
  const transactionGetAll = container.resolve(TransactionGetAll);
  const transactionUpdate = container.resolve('TransactionUpdate');
  const { data, error, isLoading, mutate } = useSWR(['transactions', {}], () => transactionGetAll.execute());

  const updateData = async (updatedTransaction: Transaction) => {
    if (!data) return;

    const newData = [...data];
    const index = newData.findIndex(t => t.id === updatedTransaction.id);
    newData[index] = updatedTransaction;

    await transactionUpdate.execute(updatedTransaction);

    await mutate(data);
  };

  return {
    data,
    error,
    updateData,
    isLoading,
  };
};
