import { TableCategory, useCategoryTableHook } from './useCategoryTable.hook';
import { CategoryTableButtons } from '@molecules/CategoryTableButtons/CategoryTableButtons';
import { BudgetPageTable } from './renders/BudgetPageTable';

export function CategoryTableView() {
  const { cdata, columns, createCategoryGroup } = useCategoryTableHook();

  return (
    <div>
      <CategoryTableButtons createCategoryGroup={createCategoryGroup} />
      <BudgetPageTable<TableCategory> columns={columns} data={cdata} />
    </div>
  );
}
