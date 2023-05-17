import styles from './AllAccountsPage.module.scss';
import cls from 'classnames';
import { useAllAccountPageHooks } from './AllAccountPage.hooks';
import { Typography } from '@atoms/Typography/Typography';
import { TransactionTableView } from '../../tables/transactions/TransactionTable.view';
import { WorkingBalance } from '@molecules/WorkingBalance/WorkingBalance';

export function AllAccountsPage() {
  const [model, operators] = useAllAccountPageHooks();
  const { workingBalance, totalCleared, totalUncleared } = model;

  return (
    <div className={cls(styles.all_accounts_page)}>
      <section className={cls('z_flex', styles.all_accounts_page_title)}>
        <Typography variant="title" Component="h2">
          All Accounts
        </Typography>
      </section>
      <section className={cls('z_flex', styles.balances)}>
        <WorkingBalance
          workingBalance={workingBalance}
          totalCleared={totalCleared}
          totalUncleared={totalUncleared}
        />
      </section>
      <section>
        <TransactionTableView />
      </section>
    </div>
  );
}
