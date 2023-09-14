import styles from './WorkingBalance.module.scss';
import { Typography } from '@atoms/Typography/Typography';
import cls from 'classnames';
import { WorkingBalance } from '@organisms/AllAccountsPage/AllAccountPage.hook';

interface WorkingBalanceProperties {
  workingBalance: WorkingBalance;
}

export function TotalWorkingBalance({ workingBalance }: WorkingBalanceProperties) {
  return (
    <>
      <div className={styles.balance_contents}>
        <div
          className={cls(styles.positive_amount, {
            [styles.negative_amount]: workingBalance.totalCleared.includes('-'),
          })}
        >
          <Typography variant="balance">{workingBalance.totalCleared}</Typography>
        </div>
        <div className={styles.balance_text}>
          <Typography variant="info" size="small">
            Cleared Balance
          </Typography>
        </div>
      </div>
      <div className={styles.balance_contents}>
        <div className={styles.balance_symbol}>+</div>
      </div>
      <div className={styles.balance_contents}>
        <div
          className={cls(styles.positive_amount, {
            [styles.negative_amount]: workingBalance.totalUncleared.includes('-'),
          })}
        >
          <Typography variant="balance">{workingBalance.totalUncleared}</Typography>
        </div>
        <div className={styles.balance_text}>
          <Typography variant="info" size="small">
            Uncleared Balance
          </Typography>
        </div>
      </div>
      <div className={styles.balance_contents}>
        <div className={styles.balance_symbol}>=</div>
      </div>
      <div className={styles.balance_contents}>
        <div
          className={cls(styles.positive_amount, {
            [styles.negative_amount]: workingBalance.totalWorkingBalance.includes('-'),
          })}
        >
          <Typography variant="balance" Component="p">
            {workingBalance.totalWorkingBalance}
          </Typography>
        </div>
        <div className={styles.balance_text}>
          <Typography variant="info" size="small">
            Working Balance
          </Typography>
        </div>
      </div>
    </>
  );
}
