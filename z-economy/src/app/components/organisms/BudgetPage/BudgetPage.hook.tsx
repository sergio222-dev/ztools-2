// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { ReactNode, useState } from 'react';
import currency from 'currency.js';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';

interface BudgetPageModel {
  budgetDate: Date;
  totalToAssign: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BudgetPageOperators {
  renderMonthContent: (monthIndex: number, shortMonthText: string, fullMonthText: string) => ReactNode;
  setBudgetDate: (date: Date) => void;
  addMonthHandler: () => void;
  substractMonthHandler: () => void;
  renderSwitch: (totalToAssign: string, className?: boolean) => string;
}

export function useBudgetPageHooks(): [BudgetPageModel, BudgetPageOperators] {
  // MODEL

  // STATE
  const [budgetDate, setBudgetDate] = useState<Date>(new Date());

  // SERVICES
  const { cdata } = useCategoryHook(budgetDate);

  // OPERATORS
  const renderMonthContent = (month: number, shortMonth: string, longMonth: string) => {
    const tooltipText = `Tooltip for month: ${longMonth}`;
    return <span title={tooltipText}>{shortMonth}</span>;
  };

  const addMonthHandler = () => {
    setBudgetDate(new Date(budgetDate.getFullYear(), budgetDate.getMonth() + 1, 1));
  };

  const substractMonthHandler = () => {
    setBudgetDate(new Date(budgetDate.getFullYear(), budgetDate.getMonth() - 1, 1));
  };

  const renderSwitch = (totalToAssign: string, className?: boolean) => {
    if (Number(currency(totalToAssign).value) > 0) {
      return className === true ? 'global_assigned_positive' : 'Ready to Assign';
    }
    if (Number(currency(totalToAssign).value) < 0) {
      return className === true ? 'global_assigned_negative' : 'You assigned more than you have';
    }
    return className === true ? 'global_assigned_neutral' : 'All Money Assigned';
  };

  // SIDE EFFECTS
  const globalAssigned = cdata
    ?.reduce((total, category) => {
      // eslint-disable-next-line unicorn/no-array-reduce
      return currency(total).add(
        category.subCategories.reduce((subTotal, subCategory) => {
          return currency(subTotal).add(subCategory.assignedBudget);
        }, currency(0)),
      );
    }, currency(0))
    .format();

  const globalAvailable = cdata
    ?.reduce((total, category) => {
      // eslint-disable-next-line unicorn/no-array-reduce
      return currency(total).add(
        category.subCategories.reduce((subTotal, subCategory) => {
          return currency(subTotal).add(subCategory.available);
        }, currency(0)),
      );
    }, currency(0))
    .format();

  const totalToAssign = currency(globalAvailable).subtract(globalAssigned).format();

  return [
    { budgetDate, totalToAssign },
    { renderMonthContent, setBudgetDate, addMonthHandler, substractMonthHandler, renderSwitch },
  ];
}
