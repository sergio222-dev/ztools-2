import { container } from 'tsyringe';
import { AccountCreate } from '@core/budget/account/application/useCase/AccountCreate';
import useSWR from 'swr';
import { AccountGetAll } from '@core/budget/account/application/useCase/AccountGetAll';
import { Account } from '@core/budget/account/domain/Account';
import { AccountUpdate } from '@core/budget/account/application/useCase/AccountUpdate';
import { AccountDelete } from '@core/budget/account/application/useCase/AccountDelete';

export const useAccountHook = () => {
  // SERVICES
  const accountGetAll = container.resolve(AccountGetAll);
  const accountCreate = container.resolve(AccountCreate);
  const accountUpdate = container.resolve(AccountUpdate);
  const accountDelete = container.resolve(AccountDelete);

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['accounts'], () => accountGetAll.execute(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    revalidateOnMount: true,
  });

  const createAccount = async (a: Account) => {
    await accountCreate.execute(a);
    await mutate(data);
  };

  const updateAccount = async (a: Account) => {
    if (!data) return;
    await accountUpdate.execute(a);
    await mutate(data);
  };

  const deleteAccount = async (id: string) => {
    if (!data) return;
    await accountDelete.execute(id);
    await mutate(data);
  };

  const mutateAccountData = async () => {
    void mutate(data, { revalidate: true });
  };

  return {
    adata: data ?? [],
    error: error,
    isLoading,
    createAccount,
    updateAccount,
    deleteAccount,
    mutateAccountData,
  };
};
