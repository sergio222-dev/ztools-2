import styles from './AllAccountsPage.module.scss';
import cls from 'classnames';
import { TransactionTable } from '@molecules/TransactionTable/TransactionTable';
import { useAllAccountPagePresenter } from './AllAccountPage.hooks';
import { Typography } from '@atoms/Typography/Typography';
import { Transaction } from '@core/budget/transactions/domain/Transaction';

export function AllAccountsPage() {
  const [model, operators] = useAllAccountPagePresenter();

  const { columns, loadedData } = model;

  return (
    <div className={cls(styles.all_accounts_page)}>
      <section className={cls('z_flex', styles.all_accounts_page_title)}>
        <Typography variant="title" Component="h2">
          All Accounts
        </Typography>
      </section>
      <section className={cls('z_flex', styles.balances)}>
        <div className={styles.balance_contents}>
          <div className={styles.amount}>
            <Typography variant="balance">$299,000.00</Typography>
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
          <div className={styles.amount}>
            <Typography variant="balance">$0.00</Typography>
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
          <div className={styles.amount}>
            <Typography variant="balance" Component="p">
              $299,000.00
            </Typography>
          </div>
          <div className={styles.balance_text}>
            <Typography variant="info" size="small">
              Working Balance
            </Typography>
          </div>
        </div>
      </section>
      <section>
        <TransactionTable<Transaction> columns={columns} data={loadedData} operators={operators} />
      </section>
    </div>
  );
}
