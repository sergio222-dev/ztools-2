import { useMemo } from 'react';
import { Column, useTable, useSortBy, TableInstance, UseSortByInstanceProps } from 'react-table';
import styles from './Table.module.scss';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/all';
import cls from 'classnames';

interface Transactions {
  account: string;
  payee: string;
  memo: string;
  date: string;
  category: string;
  inflow: string;
  outflow: string;
}

type TableInstanceWithHook<T extends object> = TableInstance<T> & UseSortByInstanceProps<T>;

const mockData: Transactions[] = [
  {
    account: 'zasd',
    category: 'DSA',
    date: 'tdoday',
    inflow: '',
    outflow: '',
    memo: 'asdazxsd',
    payee: 'dasddqasdasd',
  },
  {
    account: 'agfsd',
    category: 'DxxcSA',
    date: 'today',
    inflow: '',
    outflow: '',
    memo: 'asdagcsd',
    payee: 'dasdasdasd',
  },
  {
    account: 'asd',
    category: 'DfSA',
    date: 'tosgday',
    inflow: '',
    outflow: '12',
    memo: 'asdasd',
    payee: 'dasdeasdasd',
  },
];

export function TransactionTable({}) {
  const columns = useMemo<Column<Transactions>[]>(
    () => [
      {
        Header: 'account',
        accessor: 'account',
      },
      {
        Header: 'DATE',
        accessor: 'date',
      },
      {
        Header: 'PAYEE',
        accessor: 'payee',
      },
      {
        Header: 'CATEGORY',
        accessor: 'category',
      },
      {
        Header: 'MEMO',
        accessor: 'memo',
      },
      {
        Header: 'OUTFLOW',
        accessor: 'outflow',
        type: 'numeric',
      },
      {
        Header: 'INFLOW',
        accessor: 'inflow',
        type: 'numeric',
      },
    ],
    [],
  );

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } = useTable<Transactions>(
    { columns, data: mockData },
    useSortBy,
  ) as TableInstanceWithHook<Transactions>;

  return (
    <table className={styles.z_table} {...getTableProps()}>
      <thead>
        {headerGroups.map(hg => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map(h => (
              <th
                className={cls(styles.z_table_head, '')}
                {...h.getHeaderProps(h.getSortByToggleProps())}
                data-type={h.type ?? ''}
              >
                <div className="z_flex">
                  {h.render('Header')}
                  <span style={{ width: '16px', height: '16px' }}>
                    {h.isSorted ? h.isSortedDesc ? <AiOutlineCaretDown /> : <AiOutlineCaretUp /> : ''}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(r => {
          prepareRow(r);
          return (
            <tr {...r.getRowProps()}>
              {r.cells.map(c => {
                return <td {...c.getCellProps()}>{c.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
