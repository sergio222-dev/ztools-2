import useSWR from 'swr';
import { container } from 'tsyringe';
import { TransactionGetAll } from '@core/budget/transaction/application/useCase/TransactionGetAll';
import { TransactionUpdate } from '@core/budget/transaction/application/useCase/TransactionUpdate';
import { TransactionCreate } from '@core/budget/transaction/application/useCase/TransactionCreate';
import { Transaction } from '@core/budget/transaction/domain/Transaction';

export const useTransaction = () => {
  const transactionGetAll = container.resolve(TransactionGetAll);
  const transactionUpdate = container.resolve(TransactionUpdate);
  const transactionCreate = container.resolve(TransactionCreate);
  const { data, error, isLoading, mutate } = useSWR(['transactions', {}], () => transactionGetAll.execute());

  const updateData = async (updatedTransaction: Transaction) => {
    if (!data) return;

    const newData = [...data];
    const index = newData.findIndex(t => t.id === updatedTransaction.id);
    newData[index] = updatedTransaction;

    await transactionUpdate.execute(updatedTransaction);

    await mutate(data);
  };

  const createData = async (t: Transaction) => {
    if (!data) return;

    await transactionCreate.execute(t);
  };

  return {
    data,
    error,
    updateData,
    createData,
    isLoading,
  };
};
