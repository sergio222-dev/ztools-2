import { container } from 'tsyringe';
import { CategoryGetAll } from '@core/budget/category/application/useCase/CategoryGetAll';
import { CategoryGroupCreate } from '@core/budget/category/application/useCase/CategoryGroupCreate';
import useSWR from 'swr';
import { Category } from '@core/budget/category/domain/Category';
import { SubCategoryCreate } from '@core/budget/category/application/useCase/SubCategoryCreate';
import { SubCategory } from '@core/budget/category/domain/SubCategory';
import { SubCategoryBudget } from '@core/budget/category/domain/SubCategoryBudget';
import { SubCategoryAssign } from '@core/budget/category/application/useCase/SubCategoryAssign';
import { SubCategoryDelete } from '@core/budget/category/application/useCase/SubCategoryDelete';
import { CategoryDelete } from '@core/budget/category/application/useCase/CategoryDelete';
import { useMemo } from 'react';
import currency from 'currency.js';
import { SubCategoryDeleteBody } from '@core/budget/category/domain/SubCategoryDeleteBody';

export const useCategoryHook = (date: Date) => {
  // SERVICES
  const categoryGetAll = container.resolve(CategoryGetAll);
  const categoryCreate = container.resolve(CategoryGroupCreate);
  const categoryDelete = container.resolve(CategoryDelete);
  const subCategoryCreate = container.resolve(SubCategoryCreate);
  const subCategoryBudgetAssign = container.resolve(SubCategoryAssign);
  const subCategoryDelete = container.resolve(SubCategoryDelete);

  // SWR
  const { data, error, isLoading, mutate, isValidating } = useSWR(['categories'], () =>
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

  // STATE
  const totalAssigned = useMemo(() => {
    if (!data) return currency(0);

    const available = data[0].subCategories[0].available;

    const assigned =
      data?.reduce((total, category) => {
        return currency(total).add(
          // eslint-disable-next-line unicorn/no-array-reduce
          category.subCategories.reduce((subTotal, subCategory) => {
            return currency(subTotal).add(subCategory.assignedBudget);
          }, currency(0)),
        );
      }, currency(0)) || currency(0);

    return currency(available).subtract(assigned).format();
  }, [isValidating]);

  const createCategory = async (c: Category) => {
    if (!data) return;
    await categoryCreate.execute(c);
    await mutate(data);
  };

  const deleteCategory = async (id: string) => {
    if (!data) return;
    await categoryDelete.execute(id);
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

  const deleteSubCategory = async (ids: SubCategoryDeleteBody) => {
    if (!data) return;
    await subCategoryDelete.execute(ids);
    await mutate(data);
  };

  const mutateData = async () => {
    void mutate(data, { revalidate: true });
  };

  const findAdjustmentSubcategoryId = () => {
    const adjustmentsCategory = data?.find(category => category.name === 'Adjustments');

    if (adjustmentsCategory) {
      const adjustmentSubcategory = adjustmentsCategory.subCategories.find(
        s => s.name === 'Inflow: Ready to Assign',
      );
      if (adjustmentSubcategory) {
        return adjustmentSubcategory.id;
      }
      return '';
    }
    return '';
  };

  const subCats: SubCategory[] = [];

  if (data) {
    for (const category of data) {
      for (const subCategory of category.subCategories) {
        subCats.push(subCategory);
      }
    }
  }

  return {
    cdata: data ?? [],
    error: error,
    isLoading,
    mutate,
    totalAssigned: totalAssigned.toString(),
    mutateData,
    createCategoryGroup: createCategory,
    createSubCategory,
    assignSubCategoryBudget,
    deleteSubCategory,
    deleteCategory,
    findAdjustmentSubcategoryId,
    subCats,
  };
};
