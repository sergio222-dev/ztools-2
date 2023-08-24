import { container } from 'tsyringe';
import { CategoryGetAll } from '@core/budget/category/application/useCase/CategoryGetAll';
import { CategoryGroupCreate } from '@core/budget/category/application/useCase/CategoryGroupCreate';
import useSWR from 'swr';
import { Category } from '@core/budget/category/domain/Category';
import { CategoryCreate } from '@core/budget/category/application/useCase/CategoryCreate';
import { SubCategory } from '@core/budget/category/domain/SubCategory';

export const useCategoryHook = () => {
  // SERVICES
  const categoryGetAll = container.resolve(CategoryGetAll);
  const categoryCreate = container.resolve(CategoryGroupCreate);
  const subCategoryCreate = container.resolve(CategoryCreate);

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['categories'], () =>
    categoryGetAll.execute({ month: '08', year: '2023' }),
  );

  const createCategory = async (c: Category) => {
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
    cdata: data ?? [],
    error: error,
    isLoading,
    mutate,
    createCategoryGroup: createCategory,
    createSubCategory,
  };
};
