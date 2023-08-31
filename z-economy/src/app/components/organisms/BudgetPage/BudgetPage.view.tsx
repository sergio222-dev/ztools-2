import { useBudgetPageHooks } from './BudgetPage.hook';
import { CategoryTableView } from '../../tables/Categories/CategoryTable.view';
import cls from 'classnames';
import styles from '@organisms/BudgetPage/BudgetPage.module.scss';
import DatePicker from 'react-datepicker';
import { Input } from '@atoms/Input/Input';
import { IconButton } from '@atoms/Button/IconButton';
import { AiOutlineRightCircle, AiOutlineLeftCircle, AiFillCaretDown } from 'react-icons/ai';

export function BudgetPageView() {
  const [model, operators] = useBudgetPageHooks();
  const { budgetDate } = model;
  const { setBudgetDate, renderMonthContent } = operators;

  const addMonthHandler = () => {
    setBudgetDate(new Date(budgetDate.getFullYear(), budgetDate.getMonth() + 1, 1));
  };

  const substractMonthHandler = () => {
    setBudgetDate(new Date(budgetDate.getFullYear(), budgetDate.getMonth() - 1, 1));
  };

  return (
    <div className={cls(styles.budget_page)}>
      <section className={cls('z_flex', styles.budget_page_date)} spellCheck="false">
        <IconButton className={styles.bp_date_buttons} onClick={substractMonthHandler}>
          <AiOutlineLeftCircle />
        </IconButton>
        <div className={styles.date_input_container}>
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
          <AiFillCaretDown className={styles.date_caret_icon} />
        </div>
        <IconButton className={styles.bp_date_buttons} onClick={addMonthHandler}>
          <AiOutlineRightCircle />
        </IconButton>
      </section>
      <section>
        <CategoryTableView budgetDate={budgetDate} />
      </section>
    </div>
  );
}
