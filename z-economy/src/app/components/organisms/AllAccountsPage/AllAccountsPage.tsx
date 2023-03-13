import styles from './AllAccountsPage.module.scss';
import cls from 'classnames';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

type BalanceData = {
  id: number;
  name: string;
  balance: number;
};

const originalData: Array<BalanceData> = [];

for (let index = 0; index < 100; index++) {
  originalData.push({
    id: index + 1,
    name: `Account ${index + 1}`,
    balance: Math.floor(Math.random() * 10_000),
  });
}
export function AllAccountsPage() {
  const data = useMemo(() => originalData, []);

  const columnHelper = createColumnHelper<BalanceData>();

  const columns = [
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
          Aca hay tabla
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? undefined
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? undefined
                        : flexRender(header.column.columnDef.footer, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}
