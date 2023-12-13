import { mutate as swrMutate, useSWRConfig } from 'swr';
import { container } from 'tsyringe';
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
import useSWRInfinite from 'swr/infinite';
import { TransactionGetAllPaginated } from '@core/budget/transaction/application/useCase/TransactionGetAllPaginated';
import { TransactionGetAllByAccountIdPaginated } from '@core/budget/transaction/application/useCase/TransactionGetAllByAccountIdPaginated';

const getKey = (pageIndex: number, previousPageData: string | any[]) => {
  if (previousPageData && previousPageData.length === 0) return;
  return [`transactions${pageIndex}`, pageIndex + 1];
};

export const useTransactionHook = (pagination: { index: number; pageSize: number }, accountId?: string) => {
  // SERVICES
  // const transactionGetAll = container.resolve(TransactionGetAll);
  const transactionUpdate = container.resolve(TransactionUpdate);
  const transactionCreate = container.resolve(TransactionCreate);
  const transactionDelete = container.resolve(TransactionDelete);
  const transactionDeleteBatch = container.resolve(TransactionDeleteBatch);
  const transactionGetAllByCategoryId = container.resolve(TransactionGetAllByCategoryId);
  const transactionGetAllPaginated = container.resolve(TransactionGetAllPaginated);
  const transactionGetAllByAccountIdPaginated = container.resolve(TransactionGetAllByAccountIdPaginated);

  const { adata } = useAccountHook();

  // TODO: Fix fetching sorting on (on the api controller)
  // TODO: Fix account filtered fetching to show the transactions that aren't loaded yet in all accounts

  // SWR
  const { cache } = useSWRConfig();

  const {
    data,
    error,
    isLoading,
    mutate,
    size,
    setSize,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useSWRInfinite(
    getKey,
    tuple =>
      accountId
        ? transactionGetAllByAccountIdPaginated.execute({
            accountId,
            index: tuple[1] as number,
            pageSize: pagination.pageSize,
          })
        : transactionGetAllPaginated.execute({ index: tuple[1] as number, pageSize: pagination.pageSize }),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateFirstPage: false,
    },
  );

  const isLoadingMore = (isLoading || (size > 0 && data && data[size - 1] === undefined)) ?? false;
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = (isEmpty || (data && data[data.length - 1]?.length < pagination?.pageSize)) ?? false;

  const trigger = async (
    tableReference: MutableRefObject<Table<Transaction> | undefined>,
    setEditingRow: Dispatch<SetStateAction<string>>,
    editableValue: { current: object },
    setSelectedQty: Dispatch<SetStateAction<number>>,
    setDisableDelete: Dispatch<SetStateAction<boolean>>,
    subCats: SubCategory[],
    accountId: string | undefined,
  ) => {
    void mutate(
      async () => {
        if (data && data[0][0]?.id === '') return data ?? [];
        const newTransaction = new Transaction(
          '',
          '',
          '',
          '',
          '',
          subCats[0].id,
          new Date().toISOString(),
          true,
          accountId ?? (adata.length > 0 ? adata[0].id : ''),
        );
        setEditingRow('');
        tableReference.current?.setRowSelection(() => ({
          ['']: true,
        }));
        tableReference.current?.setExpanded(() => ({
          ['']: true,
        }));
        tableReference.current &&
          setSelectedQty(tableReference.current?.getSelectedRowModel().rows.filter(t => t.id !== '').length);
        setDisableDelete(true);
        editableValue.current = newTransaction;
        return [[newTransaction, ...(data?.slice(0, 1).flat() ?? [])], ...(data?.slice(1) ?? [])];
      },
      {
        revalidate: false,
      },
    );
  };

  const deleteFakeRow = async (revalidate?: boolean) => {
    void mutate(
      async () => {
        if (data && data[0][0]?.id === '') {
          return data.map(transactionSubArray => {
            return transactionSubArray.filter(transaction => transaction.id !== '');
          });
        }
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
    // if its Transaction[][], we need to know in which index the subArray containing the original transaction is to mutate it after updating.
    const pageIndex = data.findIndex(subArray => {
      return subArray.some(t => t.id === updatedTransaction.id);
    });
    // const transactionIndex = isArrayTransactionArray(data) ? data[indexOfTransactionSubarrayInInfiniteData].findIndex((obj) => obj.id === updatedTransaction.id) : -1;
    const newData = data.flat();
    const index = newData.findIndex(t => t.id === updatedTransaction.id);
    newData[index] = updatedTransaction;

    await transactionUpdate.execute(updatedTransaction);

    void swrMutate([`transactions${pageIndex}`, pageIndex + 1], async cachedData => {
      const index = cachedData.findIndex((t: Transaction) => t.id === updatedTransaction.id);
      if (index !== -1) {
        cachedData[index] = updatedTransaction;
        // cachedData.push('');
      }
      // setSize(size);
      void mutate();
      return;
    });
  };

  const createTransaction = async (t: Transaction) => {
    if (!data) return;
    await deleteFakeRow(true);
    await transactionCreate.execute(t);
    await mutate(data);
  };

  const deleteTransaction = async (t: Transaction) => {
    if (!data) return;
    await transactionDelete.execute(t);
    // await mutate(data);
    const pageIndex = data.findIndex(subArray => {
      return subArray.some(originalTransaction => originalTransaction.id === t.id);
    });
    void swrMutate([`transactions${pageIndex}`, pageIndex + 1], async cachedData => {
      // debugger
      const index = cachedData.findIndex((cachedTransaction: Transaction) => cachedTransaction.id === t.id);
      if (index !== -1) {
        delete cachedData[index];
      }
      // setSize(size);
      void mutate();
      return;
    });
  };

  const deleteTransactionBatch = async (t: { ids: string[] }) => {
    if (!data) return;
    await transactionDeleteBatch.execute(t);
    // await mutate(data);
    t.ids.map(id => {
      const pageIndex = data.findIndex(subArray => {
        return subArray.some(originalTransaction => originalTransaction.id === id);
      });
      void swrMutate([`transactions${pageIndex}`, pageIndex + 1], async cachedData => {
        const index = cachedData.findIndex((cachedTransaction: Transaction) => cachedTransaction?.id === id);
        if (index !== -1) {
          delete cachedData[index];
        }
        // setSize(size);
        void mutate();
        return;
      });
    });
  };

  // TODO: the name of this function is wrong
  const getAllTransactionsByCategoryId = async (accountId: string) => {
    if (!data) return;
    return await transactionGetAllByCategoryId.execute(accountId);
  };

  const mutateOnAccountChange = async () => {
    for (const key of cache.keys()) {
      if (key.includes('transactions')) {
        void cache.delete(key);
      }
    }
    setSize && setSize(1);
    void mutate();
  };

  return {
    tdata: data ?? [],
    error: error,
    mutate,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
    updateData: updateTransaction,
    createData: createTransaction,
    deleteData: deleteTransaction,
    trigger,
    deleteFakeRow,
    deleteDataBatch: deleteTransactionBatch,
    getAllTransactionsByCategoryId,
    mutateOnAccountChange,
  };
};
