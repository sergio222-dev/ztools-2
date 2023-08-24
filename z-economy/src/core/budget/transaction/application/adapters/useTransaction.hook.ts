import useSWR from 'swr';
import { container } from 'tsyringe';
import { TransactionGetAll } from '@core/budget/transaction/application/useCase/TransactionGetAll';
import { TransactionUpdate } from '@core/budget/transaction/application/useCase/TransactionUpdate';
import { TransactionCreate } from '@core/budget/transaction/application/useCase/TransactionCreate';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Table } from '@tanstack/react-table';
import { TransactionDelete } from '@core/budget/transaction/application/useCase/TransactionDelete';
import { TransactionDeleteBatch } from '@core/budget/transaction/application/useCase/TransactionDeleteBatch';

export const useTransactionHook = () => {
  // SERVICES
  const transactionGetAll = container.resolve(TransactionGetAll);
  const transactionUpdate = container.resolve(TransactionUpdate);
  const transactionCreate = container.resolve(TransactionCreate);
  const transactionDelete = container.resolve(TransactionDelete);
  const transactionDeleteBatch = container.resolve(TransactionDeleteBatch);

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['transactions'], () => transactionGetAll.execute());

  const trigger = async (
    tableReference: MutableRefObject<Table<Transaction> | undefined>,
    setEditingRow: Dispatch<SetStateAction<string>>,
    editableValue: { current: object },
    setSelectedQty: Dispatch<SetStateAction<number>>,
    setDisableDelete: Dispatch<SetStateAction<boolean>>,
  ) => {
    editableValue.current = {};
    void mutate(
      async () => {
        if (data && data[0]?.id === '') return data ?? [];
        const newTransaction = new Transaction('', '', '', '', '', '', new Date().toISOString(), true);
        setEditingRow('');
        await tableReference.current?.setRowSelection(() => ({
          ['']: true,
        }));
        tableReference.current?.setExpanded(() => ({
          ['']: true,
        }));
        tableReference.current &&
          setSelectedQty(tableReference.current?.getSelectedRowModel().rows.filter(t => t.id !== '').length);
        setDisableDelete(true);
        return [newTransaction, ...(data ?? [])];
      },
      {
        revalidate: false,
      },
    );
  };

  const deleteFakeRow = async (revalidate?: boolean) => {
    void mutate(
      async () => {
        if (data && data[0]?.id === '') return data?.filter(t => t.id !== '');
        return data;
      },
      {
        revalidate: revalidate ?? false,
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
    await deleteFakeRow(true);
    await transactionCreate.execute(t);
  };

  const deleteData = async (t: Transaction) => {
    if (!data) return;
    await transactionDelete.execute(t);
    await mutate(data);
  };

  const deleteDataBatch = async (t: { ids: string[] }) => {
    if (!data) return;
    await transactionDeleteBatch.execute(t);
    await mutate(data);
  };

  return {
    data: data ?? [],
    error: error,
    isLoading,
    updateData,
    createData,
    deleteData,
    trigger,
    deleteFakeRow,
    deleteDataBatch,
  };
};
