import { CategoryTable } from '../../molecules/index';
import { Category, useBudgetPagePresenter } from './BudgetPage.presenter';

export function BudgetPageView() {
  const [model] = useBudgetPagePresenter();
  const { columns, data } = model;

  return (
    <section>
      <CategoryTable<Category> columns={columns} data={data} />
    </section>
  );
}
