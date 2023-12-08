import useSWR, { KeyedMutator, mutate as swrMutate } from 'swr';
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
import useSWRInfinite from 'swr/infinite';
import { TransactionGetAllPaginated } from '@core/budget/transaction/application/useCase/TransactionGetAllPaginated';

export const useTransactionHook = (pagination?: { index: number; pageSize: number }) => {
  // SERVICES
  const transactionGetAll = container.resolve(TransactionGetAll);
  const transactionUpdate = container.resolve(TransactionUpdate);
  const transactionCreate = container.resolve(TransactionCreate);
  const transactionDelete = container.resolve(TransactionDelete);
  const transactionDeleteBatch = container.resolve(TransactionDeleteBatch);
  const transactionGetAllByCategoryId = container.resolve(TransactionGetAllByCategoryId);
  const transactionGetAllPaginated = container.resolve(TransactionGetAllPaginated);

  const { adata } = useAccountHook();

  // TODO: Fix fetching sorting on (on the api controller)
  // TODO: Fix account filtered fetching to show the transactions that aren't loaded yet in all accounts

  // SWR
  let data: Array<Transaction[]> | Transaction[] | undefined,
    error,
    isLoading,
    mutate: KeyedMutator<any>,
    size,
    setSize;

  if (pagination) {
    const getKey = (pageIndex: number, previousPageData: string | any[]) => {
      if (previousPageData && previousPageData.length === 0) return;
      return [`transactions${pageIndex}`, pageIndex + 1];
    };

    const {
      data: infiniteData,
      error: infiniteError,
      isLoading: infiniteIsLoading,
      mutate: infiniteMutate,
      size: infiniteSize,
      setSize: infiniteSetSize,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useSWRInfinite(
      getKey,
      tuple =>
        transactionGetAllPaginated.execute({ index: tuple[1] as number, pageSize: pagination.pageSize }),
      {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        revalidateFirstPage: false,
      },
    );
    data = infiniteData; // it's possible to flatten the data array directly from here but doing so doesn't allow us to check if there's no more data to load to disable the infinite scroll fetching.
    error = infiniteError;
    isLoading = infiniteIsLoading;
    mutate = infiniteMutate;
    size = infiniteSize;
    setSize = infiniteSetSize;
  } else {
    const {
      data: normalData,
      error: normalError,
      isLoading: normalIsLoading,
      mutate: normalMutate,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useSWR(['transactions'], () => transactionGetAll.execute());
    data = normalData;
    error = normalError;
    isLoading = normalIsLoading;
    mutate = normalMutate;
  }

  function isArrayTransactionArray(data: any): data is Array<Transaction[]> {
    return Array.isArray(data) && data.length > 0 && Array.isArray(data[0]);
  }

  let isLoadingMore, isEmpty, isReachingEnd;

  if (pagination && data && size) {
    isLoadingMore = isLoading || (size > 0 && data && data[size - 1] === undefined);
    isEmpty = isArrayTransactionArray(data) && data?.[0]?.length === 0;
    isReachingEnd =
      isEmpty || (isArrayTransactionArray(data) && data[data.length - 1]?.length < pagination?.pageSize);
  }

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
        if (data && isArrayTransactionArray(data) ? data[0][0]?.id === '' : data && data[0]?.id === '')
          return data ?? [];
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
        if (data && isArrayTransactionArray(data) && data[0][0]?.id === '')
          return data[0]?.filter(t => t.id !== '');
        if (data && !isArrayTransactionArray(data) && data[0]?.id === '')
          return data?.filter(t => t.id !== '');
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
    const pageIndex = isArrayTransactionArray(data)
      ? data.findIndex(subArray => {
          return subArray.some(t => t.id === updatedTransaction.id);
        })
      : -1;
    // const transactionIndex = isArrayTransactionArray(data) ? data[indexOfTransactionSubarrayInInfiniteData].findIndex((obj) => obj.id === updatedTransaction.id) : -1;
    const newData = isArrayTransactionArray(data) ? data.flat() : [...data];
    const index = newData.findIndex(t => t.id === updatedTransaction.id);
    newData[index] = updatedTransaction;

    await transactionUpdate.execute(updatedTransaction);

    void swrMutate([`transactions${pageIndex}`, pageIndex + 1], async cachedData => {
      const index = cachedData.findIndex((t: Transaction) => t.id === updatedTransaction.id);
      if (index !== -1) {
        cachedData[index] = updatedTransaction;
      }
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
    const pageIndex = isArrayTransactionArray(data)
      ? data.findIndex(subArray => {
          return subArray.some(originalTransaction => originalTransaction.id === t.id);
        })
      : -1;
    void swrMutate([`transactions${pageIndex}`, pageIndex + 1], async cachedData => {
      // debugger
      const index = cachedData.findIndex((cachedTransaction: Transaction) => cachedTransaction.id === t.id);
      if (index !== -1) {
        delete cachedData[index];
      }
      return;
    });
  };

  const deleteTransactionBatch = async (t: { ids: string[] }) => {
    if (!data) return;
    await transactionDeleteBatch.execute(t);
    // await mutate(data);
    t.ids.map(id => {
      const pageIndex = isArrayTransactionArray(data)
        ? data.findIndex(subArray => {
            return subArray.some(originalTransaction => originalTransaction.id === id);
          })
        : -1;
      void swrMutate([`transactions${pageIndex}`, pageIndex + 1], async cachedData => {
        const index = cachedData.findIndex((cachedTransaction: Transaction) => cachedTransaction?.id === id);
        if (index !== -1) {
          delete cachedData[index];
        }
        return;
      });
    });
  };

  const getAllTransactionsByCategoryId = async (accountId: string) => {
    if (!data) return;
    return await transactionGetAllByCategoryId.execute(accountId);
  };

  return {
    tdata: data ?? [],
    error: error,
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
  };
};
