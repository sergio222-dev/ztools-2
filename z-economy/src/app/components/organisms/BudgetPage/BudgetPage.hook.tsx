// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { ReactNode, useState } from 'react';
import currency from 'currency.js';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';
import { Signal, useSignal } from '@preact/signals-react';

interface BudgetPageModel {
  budgetDate: Date;
  totalAssigned: string;
  isOpen: Signal<boolean>;
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
  const isOpen = useSignal(false);

  // SERVICES
  const { cdata, totalAssigned } = useCategoryHook(budgetDate);

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

  return [
    { budgetDate, totalAssigned, isOpen },
    { renderMonthContent, setBudgetDate, addMonthHandler, substractMonthHandler, renderSwitch },
  ];
}
