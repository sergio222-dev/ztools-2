import styles from './AllAccountsPage.module.scss';
import cls from 'classnames';
import { TransactionTable } from '../../molecules/TransactionTable/TransactionTable';
import { TransactionTableData, useAllAccountPagePresenter } from './AllAccountPage.presenter';

export function AllAccountsPageView() {
  const [model] = useAllAccountPagePresenter();

  const { columns, data } = model;

  return (
    <div className={cls(styles.all_accounts_page)}>
      <section className={cls('z_flex', styles.all_accounts_page_title)}>
        <h2>All Accounts</h2>
      </section>
      <section className={cls('z_flex', styles.balances)}>
        <div className={styles.balances_contents}>
          <span className={styles.amount}>$299,000.00</span>
          <span className={styles.balance_text}>Cleared Balance</span>
        </div>
        <div className={styles.balances_contents}>
          <span className={styles.balances_symbol}>+</span>
        </div>
        <div className={styles.balances_contents}>
          <span className={styles.amount}>$0.00</span>
          <span className={styles.balance_text}>Uncleared Balance</span>
        </div>
        <div className={styles.balances_contents}>
          <span className={styles.balances_symbol}>=</span>
        </div>
        <div className={styles.balances_contents}>
          <span className={styles.amount}>$299,000.00</span>
          <span className={styles.balance_text}>Working Balance</span>
        </div>
      </section>
      <section>
        <TransactionTable<TransactionTableData> columns={columns} data={data} />
      </section>
    </div>
  );
}
