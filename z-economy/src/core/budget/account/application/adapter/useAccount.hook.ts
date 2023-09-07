import { container } from 'tsyringe';
import { AccountCreate } from '@core/budget/account/application/useCase/AccountCreate';
import useSWR from 'swr';
import { AccountGetAll } from '@core/budget/account/application/useCase/AccountGetAll';
import { Account } from '@core/budget/account/domain/Account';

export const useAccountHook = () => {
  // SERVICES
  const accountGetAll = container.resolve(AccountGetAll);
  const accountCreate = container.resolve(AccountCreate);

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['accounts'], () => accountGetAll.execute());

  const createAccount = async (a: Account) => {
    if (!data) return;
    await accountCreate.execute(a);
    await mutate(data);
  };

  return {
    data: data,
    error: error,
    isLoading,
    mutate,
    createAccount,
  };
};
