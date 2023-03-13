import styles from './AllAccountsPage.module.scss';
import cls from 'classnames';
import { ColumnDef, createColumnHelper, DeepKeys } from '@tanstack/react-table';
import { useMemo } from 'react';
import { TransactionTable } from '../../molecules/TransactionTable/TransactionTable';

type BalanceData = {
  id: string;
  name: string;
  balance: string;
};

const originalData: Array<BalanceData> = [];

for (let index = 0; index < 100; index++) {
  originalData.push({
    id: (index + 1).toString(),
    name: `Account ${index + 1}`,
    balance: Math.floor(Math.random() * 10_000).toString(),
  });
}
export function AllAccountsPage() {
  const data = useMemo(() => originalData, []);

  const columnHelper = createColumnHelper<BalanceData>();

  const columns: ColumnDef<BalanceData, string>[] = [
    columnHelper.accessor('id', {
      header: () => 'ID',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('balance', {
      header: () => 'Balance',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),
  ];

  //????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

  console.log(data);
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
          <h3 className={styles.balances_h3}>+</h3>
        </div>
        <div className={styles.balances_contents}>
          <span className={styles.amount}>$0.00</span>
          <span className={styles.balance_text}>Uncleared Balance</span>
        </div>
        <div className={styles.balances_contents}>
          <h3 className={styles.balances_h3}>=</h3>
        </div>
        <div className={styles.balances_contents}>
          <span className={styles.amount}>$299,000.00</span>
          <span className={styles.balance_text}>Working Balance</span>
        </div>
      </section>
      <section className={cls('z_flex', styles.all_accounts_table)}>
        <div className={styles.table}>
          <TransactionTable<BalanceData> columns={columns} data={data} />
        </div>
      </section>
    </div>
  );
}
