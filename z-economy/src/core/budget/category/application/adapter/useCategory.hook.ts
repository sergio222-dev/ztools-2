import { container } from 'tsyringe';
import { CategoryGetAll } from '@core/budget/category/application/useCase/CategoryGetAll';
import { CategoryCreate } from '@core/budget/category/application/useCase/CategoryCreate';
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
import { CategoryDeleteRequest } from '@core/budget/category/domain/CategoryDeleteRequest';
import { CategoryUpdate } from '@core/budget/category/application/useCase/CategoryUpdate';
import { SubCategoryUpdate } from '@core/budget/category/application/useCase/SubCategoryUpdate';
import { CategoryAnalyticsGetAll } from '@core/budget/category/application/useCase/CategoryAnalyticsGetAll';

export const useCategoryHook = (date: Date) => {
  // SERVICES
  const categoryGetAll = container.resolve(CategoryGetAll);
  const categoryCreate = container.resolve(CategoryCreate);
  const categoryUpdate = container.resolve(CategoryUpdate);
  const categoryDelete = container.resolve(CategoryDelete);
  const subCategoryCreate = container.resolve(SubCategoryCreate);
  const subCategoryBudgetAssign = container.resolve(SubCategoryAssign);
  const subCategoryUpdate = container.resolve(SubCategoryUpdate);
  const subCategoryDelete = container.resolve(SubCategoryDelete);
  const categoryGetAllAnalytics = container.resolve(CategoryAnalyticsGetAll);

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
    await categoryCreate.execute(c);
    await mutate(data);
  };

  const updateCategory = async (c: Category) => {
    if (!data) return;
    await categoryUpdate.execute(c);
    await mutate(data);
  };

  const deleteCategory = async (ids: CategoryDeleteRequest) => {
    if (!data) return;
    await categoryDelete.execute(ids);
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

  const updateSubCategory = async (c: SubCategory) => {
    if (!data) return;
    await subCategoryUpdate.execute(c);
    await mutate(data);
  };

  const deleteSubCategory = async (ids: CategoryDeleteRequest) => {
    if (!data) return;
    await subCategoryDelete.execute(ids);
    await mutate(data);
  };

  const getAllCategoryAnalytics = async () => {
    return await categoryGetAllAnalytics.execute();
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
    updateCategory,
    updateSubCategory,
    createSubCategory,
    assignSubCategoryBudget,
    deleteSubCategory,
    deleteCategory,
    getAllCategoryAnalytics,
    findAdjustmentSubcategoryId,
    subCats,
  };
};
