import useSWR from 'swr';
import { container } from 'tsyringe';
import { TransactionGetAll } from '@core/budget/transaction/application/useCase/TransactionGetAll';
import { TransactionUpdate } from '@core/budget/transaction/application/useCase/TransactionUpdate';
import { TransactionCreate } from '@core/budget/transaction/application/useCase/TransactionCreate';
import { Transaction } from '@core/budget/transaction/domain/Transaction';

export const useTransaction = () => {
  // SERVICES
  const transactionGetAll = container.resolve(TransactionGetAll);
  const transactionUpdate = container.resolve(TransactionUpdate);
  const transactionCreate = container.resolve(TransactionCreate);

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['transactions', {}], () => transactionGetAll.execute());

  // TODO: Resolve types.
  const trigger = async (tableReference, setEditingRow) => {
    void mutate(
      async () => {
        if (data && data[0].id === '') return data ?? [];
        const newTransaction = new Transaction('', new Date().toISOString(), '', '', '', '', '', '');
        return [newTransaction, ...(data ?? [])];
      },
      {
        revalidate: false,
      },
    );
    setEditingRow('');
    tableReference.current?.setRowSelection(() => ({
      ['']: true,
    }));
    tableReference.current?.setExpanded(() => ({
      ['']: true,
    }));
  };

  const deleteFakeRow = async (revalidate: boolean) => {
    void mutate(
      async () => {
        if (data && data[0].id === '') return data?.filter(t => t.id !== '');
        return data;
      },
      {
        revalidate: revalidate,
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
    await deleteFakeRow(true);
  };

  return {
    data: data ?? [],
    error: error,
    updateData,
    createData,
    isLoading,
    trigger,
    deleteFakeRow,
  };
};
