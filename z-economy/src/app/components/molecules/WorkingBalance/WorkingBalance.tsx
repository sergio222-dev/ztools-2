import styles from './WorkingBalance.module.scss';
import { Typography } from '../../atoms/Typography/Typography';
import cls from 'classnames';

interface WorkingBalanceProperties {
  workingBalance: string;
  totalCleared: string;
  totalUncleared: string;
}

export function WorkingBalance({ workingBalance, totalCleared, totalUncleared }: WorkingBalanceProperties) {
  return (
    <>
      <div className={styles.balance_contents}>
        <div
          className={cls(styles.positive_amount, { [styles.negative_amount]: totalCleared.includes('-') })}
        >
          <Typography variant="balance">{totalCleared}</Typography>
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
          className={cls(styles.positive_amount, { [styles.negative_amount]: totalUncleared.includes('-') })}
        >
          <Typography variant="balance">{totalUncleared}</Typography>
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
          className={cls(styles.positive_amount, { [styles.negative_amount]: workingBalance.includes('-') })}
        >
          <Typography variant="balance" Component="p">
            {workingBalance}
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
