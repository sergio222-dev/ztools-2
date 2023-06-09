import { container } from 'tsyringe';
import { CategoryGetAll } from '@core/budget/budget/application/useCase/BudgetGetAll';
import { CategoryGet } from '@core/budget/budget/application/useCase/BudgetGet';
import useSWR from 'swr';

export const useCategory = () => {
  // SERVICES
  const categoryGetAll = container.resolve(CategoryGetAll);
  const categoryGet = container.resolve(CategoryGet);

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['categories'], () => categoryGetAll.execute());

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
