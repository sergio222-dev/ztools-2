import { useBudgetPageHooks } from './BudgetPage.hook';
import { CategoryTableView } from '../../tables/Categories/CategoryTable.view';
import cls from 'classnames';
import styles from '@organisms/BudgetPage/BudgetPage.module.scss';
import DatePicker from 'react-datepicker';
import { Input } from '@atoms/Input/Input';

export function BudgetPageView() {
  const [model, operators] = useBudgetPageHooks();
  const { budgetDate } = model;
  const { setBudgetDate, renderMonthContent } = operators;

  return (
    <div className={cls(styles.budget_page)}>
      <section className={cls('z_flex', styles.budget_page_date)} spellCheck="false">
        <DatePicker
          selected={budgetDate}
          onChange={date => setBudgetDate(date ?? new Date())}
          renderMonthContent={renderMonthContent}
          showMonthYearPicker
          dateFormat="MMM yyyy"
          customInput={<Input className={styles.bp_date_input} />}
          onKeyDown={event => {
            event.preventDefault();
          }}
        />
      </section>
      <section>
        <CategoryTableView budgetDate={budgetDate} />
      </section>
    </div>
  );
}
