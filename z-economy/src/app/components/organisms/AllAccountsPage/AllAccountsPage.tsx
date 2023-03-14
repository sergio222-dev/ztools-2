import styles from './AllAccountsPage.module.scss';
import cls from 'classnames';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { TransactionTable } from '../../molecules/TransactionTable/TransactionTable';
import { useMemo } from "react";
import { AiFillCopyrightCircle } from 'react-icons/ai';
import { ImBookmark } from 'react-icons/im';
import { IndeterminateCheckbox } from '../../molecules';

type TransactionTableData = {
  flagMark: JSX.Element;
  date: string;
  payee: string;
  category: string;
  memo: string;
  outflow: number;
  inflow: number;
  creditIcon: JSX.Element;
};

const originalData: Array<TransactionTableData> = [];

for (let index = 0; index < 100; index++) {
  originalData.push({
    flagMark: <ImBookmark />,
    date: `19/07/190${index}`,
    payee: `Person ${index}`,
    category: `Category ${index}`,
    memo: `Random words ${index}`,
    outflow: 10+index,
    inflow: 100+index,
    creditIcon: <AiFillCopyrightCircle />,
  });
}

export function AllAccountsPage() {
  const data = useMemo(() => originalData, []);

  const columnHelper = createColumnHelper<TransactionTableData>();

  const columns: ColumnDef<TransactionTableData, any >[] = [
    {
      id: 'select',
      header: ({ table }) => (
          <div className="z_flex z_flex_jc_center"><IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
          /></div>
      ),
      cell: ({ row }) => (
          <div className="z_flex z_flex_jc_center">
            <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
            />
          </div>
      ),
    },
    columnHelper.accessor('flagMark', {
      id: 'flagMark',
      header: () => <ImBookmark className={styles.flag_mark}/>,
      cell: info => info.renderValue(),
      meta: {
        type: 'other',
      }
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => 'DATE',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('payee', {
      id: 'payee',
      header: () => 'PAYEE',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('category', {
      id: 'category',
      header: () => 'CATEGORY',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('memo', {
      id: 'memo',
      header: () => 'MEMO',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('outflow', {
      id: 'outflow',
      header: () => 'OUTFLOW',
      cell: info => info.renderValue(),
      meta: {
          type: 'numeric',
      }
    }),
    columnHelper.accessor('inflow', {
      id: 'inflow',
      header: () => 'INFLOW',
      cell: info => info.renderValue(),
      meta: {
          type: 'numeric',
      }
    }),
    columnHelper.accessor('creditIcon', {
      id: 'creditIcon',
      header: () => <AiFillCopyrightCircle />,
      cell: info => info.renderValue(),
      meta: {
        type: 'other',
      }
    })
  ];

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
        {/*<div className={styles.table}>*/}
        <TransactionTable<TransactionTableData> columns={columns} data={data} />
        {/*</div>*/}
      </section>
    </div>
  );
}
