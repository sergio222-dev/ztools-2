import { container } from 'tsyringe';
import { AccountCreate } from '@core/budget/account/application/useCase/AccountCreate';
import useSWR from 'swr';
import { AccountGetAll } from '@core/budget/account/application/useCase/AccountGetAll';
import { Account } from '@core/budget/account/domain/Account';
import { AccountUpdate } from '@core/budget/account/application/useCase/AccountUpdate';

export const useAccountHook = () => {
  // SERVICES
  const accountGetAll = container.resolve(AccountGetAll);
  const accountCreate = container.resolve(AccountCreate);
  const accountUpdate = container.resolve(AccountUpdate);

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['accounts'], () => accountGetAll.execute());

  const createAccount = async (a: Account) => {
    if (!data) return;
    await accountCreate.execute(a);
    await mutate(data);
  };

  const updateAccount = async (a: Account) => {
    if (!data) return;
    await accountUpdate.execute(a);
    await mutate(data);
  };

  return {
    adata: data ?? [],
    error: error,
    isLoading,
    mutate,
    createAccount,
    updateAccount,
  };
};
