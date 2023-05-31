import { CategoryTable, CategoryTableButtons } from '../../molecules/index';
import { Category, useBudgetPageHooks } from './BudgetPage.hooks';

export function BudgetPageView() {
  const [model] = useBudgetPageHooks();
  const { columns, data } = model;

  return (
    <section>
      <CategoryTableButtons />
      <CategoryTable<Category> columns={columns} data={data} />
    </section>
  );
}
