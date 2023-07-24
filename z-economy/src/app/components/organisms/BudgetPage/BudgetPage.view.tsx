import { useBudgetPageHooks } from './BudgetPage.hook';
import { CategoryTableView } from '../../tables/Categories/CategoryTable.view';

export function BudgetPageView() {
  const [] = useBudgetPageHooks();

  return (
    <section>
      <CategoryTableView />
    </section>
  );
}
