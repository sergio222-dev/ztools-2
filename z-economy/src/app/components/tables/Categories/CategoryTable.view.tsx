import { TableCategory, useCategoryTableHook } from './useCategoryTable.hook';
import { CategoryTableButtons } from '@molecules/CategoryTableButtons/CategoryTableButtons';
import { BudgetPageTable } from './renders/BudgetPageTable';

export function CategoryTableView() {
  const { data, columns } = useCategoryTableHook();

  return (
    <div>
      <CategoryTableButtons />
      <BudgetPageTable<TableCategory> columns={columns} data={data} />
    </div>
  );
}
