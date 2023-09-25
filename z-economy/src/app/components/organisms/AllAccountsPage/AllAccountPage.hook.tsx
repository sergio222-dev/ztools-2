import { useTransactionHook } from '@core/budget/transaction/application/adapters/useTransaction.hook';
import currency from 'currency.js';
interface AllAccountPageModel {
  workingBalance: WorkingBalance;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AllAccountPageOperators {}

export type WorkingBalance = {
  totalWorkingBalance: string;
  totalCleared: string;
  totalUncleared: string;
};

export function useAllAccountPageHooks(): [AllAccountPageModel, AllAccountPageOperators] {
  // const { data, error, isLoading, mutate } = useSWR(['transactions'], () => transactionGetAll.execute());
  const { tdata } = useTransactionHook();
  const totalCleared = tdata
    // eslint-disable-next-line unicorn/no-array-reduce
    .reduce((a, transaction) => {
      if (transaction.cleared) {
        return currency(a).add(transaction.inflow).subtract(transaction.outflow);
      }
      return currency(a);
    }, currency(0))
    .format();
  const totalUncleared = tdata
    // eslint-disable-next-line unicorn/no-array-reduce
    .reduce((a, transaction) => {
      if (!transaction.cleared) {
        return currency(a).add(transaction.inflow).subtract(transaction.outflow);
      }
      return currency(a);
    }, currency(0))
    .format();

  const totalWorkingBalance = currency(totalCleared).add(totalUncleared).format();

  const workingBalance = {
    totalWorkingBalance,
    totalCleared,
    totalUncleared,
  };

  return [
    {
      workingBalance,
    },
    {},
  ];
}
