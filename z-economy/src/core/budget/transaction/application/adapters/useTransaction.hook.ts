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
import { SubCategory } from '@core/budget/category/domain/SubCategory';
import { useAccountHook } from '@core/budget/account/application/adapter/useAccount.hook';
import { TransactionGetAllByCategoryId } from '@core/budget/transaction/application/useCase/TransactionGetAllByCategoryId';

export const useTransactionHook = () => {
  // SERVICES
  const transactionGetAll = container.resolve(TransactionGetAll);
  const transactionUpdate = container.resolve(TransactionUpdate);
  const transactionCreate = container.resolve(TransactionCreate);
  const transactionDelete = container.resolve(TransactionDelete);
  const transactionDeleteBatch = container.resolve(TransactionDeleteBatch);
  const transactionGetAllByCategoryId = container.resolve(TransactionGetAllByCategoryId);

  const { adata } = useAccountHook();

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['transactions'], () => transactionGetAll.execute());

  const trigger = async (
    tableReference: MutableRefObject<Table<Transaction> | undefined>,
    setEditingRow: Dispatch<SetStateAction<string>>,
    editableValue: { current: object },
    setSelectedQty: Dispatch<SetStateAction<number>>,
    setDisableDelete: Dispatch<SetStateAction<boolean>>,
    subCats: SubCategory[],
  ) => {
    void mutate(
      async () => {
        if (data && data[0]?.id === '') return data ?? [];
        const newTransaction = new Transaction(
          '',
          '',
          '',
          '',
          '',
          subCats[0].id,
          new Date().toISOString(),
          true,
          adata.length > 0 ? adata[0].id : '',
        );
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
        editableValue.current = newTransaction;
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
  const updateTransaction = async (updatedTransaction: Transaction) => {
    if (!data) return;

    const newData = [...data];
    const index = newData.findIndex(t => t.id === updatedTransaction.id);
    newData[index] = updatedTransaction;

    await transactionUpdate.execute(updatedTransaction);

    await mutate(data);
  };

  const createTransaction = async (t: Transaction) => {
    if (!data) return;
    await deleteFakeRow(true);
    await transactionCreate.execute(t);
  };

  const deleteTransaction = async (t: Transaction) => {
    if (!data) return;
    await transactionDelete.execute(t);
    await mutate(data);
  };

  const deleteTransactionBatch = async (t: { ids: string[] }) => {
    if (!data) return;
    await transactionDeleteBatch.execute(t);
    await mutate(data);
  };

  const getAllTransactionsByCategoryId = async (accountId: string) => {
    if (!data) return;
    return await transactionGetAllByCategoryId.execute(accountId);
  };

  return {
    tdata: data ?? [],
    error: error,
    isLoading,
    updateData: updateTransaction,
    createData: createTransaction,
    deleteData: deleteTransaction,
    trigger,
    deleteFakeRow,
    deleteDataBatch: deleteTransactionBatch,
    getAllTransactionsByCategoryId,
  };
};
