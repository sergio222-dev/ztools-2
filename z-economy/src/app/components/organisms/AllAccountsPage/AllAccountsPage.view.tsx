import styles from './AllAccountsPage.module.scss';
import cls from 'classnames';
import { useAllAccountPageHooks } from './AllAccountPage.hook';
import { Typography } from '@atoms/Typography/Typography';
import { TransactionTableView } from '../../tables/transactions/TransactionTable.view';
import { TotalWorkingBalance } from '@molecules/WorkingBalance/TotalWorkingBalance';

export function AllAccountsPage() {
  const [model] = useAllAccountPageHooks();
  const { workingBalance } = model;

  return (
    <div className={cls(styles.all_accounts_page)}>
      <section className={cls('z_flex', styles.all_accounts_page_title)}>
        <Typography variant="title" Component="h2">
          All Accounts
        </Typography>
      </section>
      <section className={cls('z_flex', styles.balances)}>
        <TotalWorkingBalance workingBalance={workingBalance} />
      </section>
      <section>
        <TransactionTableView />
      </section>
    </div>
  );
}
