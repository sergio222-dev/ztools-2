import { container } from 'tsyringe';
import { CategoryGetAll } from '@core/budget/budget/application/useCase/CategoryGetAll';
import { CategoryGroupCreate } from '@core/budget/budget/application/useCase/CategoryGroupCreate';
import useSWR from 'swr';
import { Category } from '@core/budget/budget/domain/Category';
import { CategoryCreate } from '@core/budget/budget/application/useCase/CategoryCreate';
import { SubCategory } from '../../../../../app/components/forms/AddCategory/AddCategoryForm';

export const useCategoryHook = () => {
  // SERVICES
  const categoryGetAll = container.resolve(CategoryGetAll);
  const categoryCreate = container.resolve(CategoryGroupCreate);
  const subCategoryCreate = container.resolve(CategoryCreate);

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['categories'], () =>
    categoryGetAll.execute({ month: '07', year: '2023' }),
  );

  const createCategoryGroup = async (c: Category) => {
    if (!data) return;
    await categoryCreate.execute(c);
    await mutate(data);
  };

  const createSubCategory = async (c: SubCategory) => {
    if (!data) return;
    await subCategoryCreate.execute(c);
    await mutate(data);
  };

  return {
    data: data ?? [],
    error: error,
    isLoading,
    mutate,
    createCategoryGroup,
    createSubCategory,
  };
};
