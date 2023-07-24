import { useTransactionHook } from '@core/budget/transaction/application/adapters/useTransaction.hook';
import currency from 'currency.js';
interface AllAccountPageModel {
  workingBalance: string;
  totalCleared: string;
  totalUncleared: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AllAccountPageOperators {}

export function useAllAccountPageHooks(): [AllAccountPageModel, AllAccountPageOperators] {
  // const { data, error, isLoading, mutate } = useSWR(['transactions'], () => transactionGetAll.execute());
  const { data } = useTransactionHook();

  // eslint-disable-next-line unicorn/no-array-reduce
  const totalCleared = data
    .reduce((a, transaction) => {
      if (transaction.cleared) {
        return currency(a).add(transaction.inflow).subtract(transaction.outflow);
      }
      return currency(a);
    }, currency(0))
    .format();
  // eslint-disable-next-line unicorn/no-array-reduce
  const totalUncleared = data
    .reduce((a, transaction) => {
      if (!transaction.cleared) {
        return currency(a).add(transaction.inflow).subtract(transaction.outflow);
      }
      return currency(a);
    }, currency(0))
    .format();

  const workingBalance = currency(totalCleared).add(totalUncleared).format();

  // console.log(totalCleared.format());
  // console.log(totalUncleared.format());
  // console.log(workingBalance);

  return [
    {
      workingBalance,
      totalCleared,
      totalUncleared,
    },
    {},
  ];
}
