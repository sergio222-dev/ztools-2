import { useBudgetPageHooks } from './BudgetPage.hook';
import { CategoryTableView } from '../../tables/Categories/CategoryTable.view';
import cls from 'classnames';
import styles from '@organisms/BudgetPage/BudgetPage.module.scss';
import DatePicker from 'react-datepicker';
import { Input } from '@atoms/Input/Input';
import { IconButton } from '@atoms/Button/IconButton';
import { AiOutlineRightCircle, AiOutlineLeftCircle, AiFillCaretDown } from 'react-icons/ai';
import { Button } from '@atoms/Button/Button';
import { Typography } from '@atoms/Typography/Typography';

export function BudgetPageView() {
  const [model, operators] = useBudgetPageHooks();
  const { budgetDate, totalAssigned } = model;
  const { setBudgetDate, renderMonthContent, addMonthHandler, substractMonthHandler, renderSwitch } =
    operators;

  return (
    <div className={cls(styles.budget_page)}>
      <section className={cls('z_flex', styles.budget_page_date)} spellCheck="false">
        <div className={cls(styles.date_picker, 'z_flex')}>
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
              preventOpenOnFocus={true}
            />
            <AiFillCaretDown className={styles.date_caret_icon} />
          </div>
          <IconButton className={styles.bp_date_buttons} onClick={addMonthHandler}>
            <AiOutlineRightCircle />
          </IconButton>
        </div>
        <Button className={cls(styles.global_assigned_neutral, styles[renderSwitch(totalAssigned, true)])}>
          <Typography variant="balance">{totalAssigned}</Typography>
          <Typography>{renderSwitch(totalAssigned)}</Typography>
        </Button>
      </section>
      <section>
        <CategoryTableView budgetDate={budgetDate} />
      </section>
    </div>
  );
}
