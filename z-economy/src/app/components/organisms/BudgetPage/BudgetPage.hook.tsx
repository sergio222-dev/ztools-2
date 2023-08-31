// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { ReactNode, useState } from 'react';

interface BudgetPageModel {
  budgetDate: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BudgetPageOperators {
  renderMonthContent: (monthIndex: number, shortMonthText: string, fullMonthText: string) => ReactNode;
  setBudgetDate: (date: Date) => void;
  addMonthHandler: () => void;
  substractMonthHandler: () => void;
}

export function useBudgetPageHooks(): [BudgetPageModel, BudgetPageOperators] {
  // MODEL

  // STATE
  const [budgetDate, setBudgetDate] = useState<Date>(new Date());

  // OPERATOR
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

  return [{ budgetDate }, { renderMonthContent, setBudgetDate, addMonthHandler, substractMonthHandler }];
}
