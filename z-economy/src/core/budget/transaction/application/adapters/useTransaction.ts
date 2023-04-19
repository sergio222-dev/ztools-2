import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { container } from 'tsyringe';
import { TransactionGetAll } from '@core/budget/transaction/application/useCase/TransactionGetAll';
import { TransactionUpdate } from '@core/budget/transaction/application/useCase/TransactionUpdate';
import { TransactionCreate } from '@core/budget/transaction/application/useCase/TransactionCreate';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { da } from 'date-fns/locale';
import { format } from 'date-fns';

export const useTransaction = () => {
  // SERVICES
  const transactionGetAll = container.resolve(TransactionGetAll);
  const transactionUpdate = container.resolve(TransactionUpdate);
  const transactionCreate = container.resolve(TransactionCreate);

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['transactions', {}], () => transactionGetAll.execute());

  const trigger = async () => {
    void mutate(
      async () => {
        const newTransaction = new Transaction('', new Date().toISOString(), '', '', '', '', '', '');
        return [newTransaction, ...(data ?? [])];
      },
      {
        revalidate: false,
      },
    );
  };

  // HANDLERS
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
    data: data ?? [],
    error: error,
    updateData,
    createData,
    isLoading,
    trigger,
  };
};
