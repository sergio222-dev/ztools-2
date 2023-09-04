import { A, useCategoryTableHook } from './useCategoryTable.hook';
import { CategoryTableButtons } from '@molecules/CategoryTableButtons/CategoryTableButtons';
import { BudgetPageTable } from './renders/BudgetPageTable';
import { Category } from '@core/budget/category/domain/Category';

interface CategoryTableViewProperties {
  budgetDate: Date;
}

export function CategoryTableView({ budgetDate }: CategoryTableViewProperties) {
  const { cdata, columns, createCategoryGroup, handleOnEdit, reference, tableReference, handleRowOnKeyDown } =
    useCategoryTableHook(budgetDate);

  return (
    <div>
      <CategoryTableButtons createCategoryGroup={createCategoryGroup} />
      <div ref={reference}>
        <BudgetPageTable<Category>
          columns={columns}
          data={cdata}
          handleOnEdit={handleOnEdit}
          tableReference={tableReference}
          handleRowOnKeyDown={handleRowOnKeyDown}
        />
      </div>
    </div>
  );
}
