import { container } from 'tsyringe';
import { CategoryGetAll } from '@core/budget/category/application/useCase/CategoryGetAll';
import { CategoryGroupCreate } from '@core/budget/category/application/useCase/CategoryGroupCreate';
import useSWR from 'swr';
import { Category } from '@core/budget/category/domain/Category';
import { SubCategoryCreate } from '@core/budget/category/application/useCase/SubCategoryCreate';
import { SubCategory } from '@core/budget/category/domain/SubCategory';
import { SubCategoryBudget } from '@core/budget/category/domain/SubCategoryBudget';
import { SubCategoryAssign } from '@core/budget/category/application/useCase/SubCategoryAssign';
import { useEffect } from 'react';

export const useCategoryHook = (date: Date) => {
  // SERVICES
  const categoryGetAll = container.resolve(CategoryGetAll);
  const categoryCreate = container.resolve(CategoryGroupCreate);
  const subCategoryCreate = container.resolve(SubCategoryCreate);
  const subCategoryBudgetAssign = container.resolve(SubCategoryAssign);

  // SWR
  const { data, error, isLoading, mutate } = useSWR(['categories'], () =>
    categoryGetAll.execute({
      month: String(date.getMonth() + 1).padStart(2, '0'),
      year: String(date.getFullYear()),
    }),
  );

  // useEffect(() => {
  //   return  () => {
  //    void mutate(data);
  //   };
  // }, [date]);

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

  const assignSubCategoryBudget = async (b: SubCategoryBudget) => {
    if (!data) return;
    await subCategoryBudgetAssign.execute(b);
    await mutate(data);
  };

  return {
    cdata: data ?? [],
    error: error,
    isLoading,
    mutate,
    createCategoryGroup: createCategory,
    createSubCategory,
    assignSubCategoryBudget,
  };
};
