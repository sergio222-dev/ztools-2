import { useMemo } from 'react';
import { ColumnDef, createColumnHelper, Row, Table } from '@tanstack/react-table';
import { IndeterminateCheckbox } from '@molecules/index';
import { NumericTextType, OtherTextType } from '@utils/table/types';
import { ImBookmark } from 'react-icons/im';
import { AiFillCopyrightCircle } from 'react-icons/ai';
import { Labels } from '@utils/Labels';
import styles from './AllAccountsPage.module.scss';

export type TransactionTableData = {
  flagMark: Labels | undefined;
  date: string;
  payee: string;
  category: string;
  memo: string;
  outflow: string;
  inflow: string;
  creditIcon: boolean;
};

const originalData: Array<TransactionTableData> = [];

for (let index = 0; index < 100; index++) {
  originalData.push({
    flagMark: undefined,
    date: `19/07/190${index}`,
    payee: `Person ${index}`,
    category: `Category ${index}`,
    memo: `Random words ${index}`,
    outflow: (10 + index).toString(),
    inflow: (100 + index).toString(),
    creditIcon: false,
  });
}

interface AllAccountPageModel {
  columns: ColumnDef<TransactionTableData, any>[];
  data: TransactionTableData[];
}

export function useAllAccountPagePresenter(): [AllAccountPageModel, object] {
  // MODEL
  const data = useMemo(() => originalData, []);

  const columnHelper = createColumnHelper<TransactionTableData>();
  const columns: ColumnDef<TransactionTableData, any>[] = [
    {
      id: 'select',
      header: ({ table }: { table: Table<TransactionTableData> }) => (
        <div className="z_flex z_flex_jc_center">
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        </div>
      ),
      cell: ({ row }: { row: Row<TransactionTableData> }) => (
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
      meta: {
        type: new OtherTextType(),
      },
    },
    columnHelper.accessor('flagMark', {
      id: 'flagMark',
      header: () => <ImBookmark className={styles.flag_mark} />,
      cell: () => <ImBookmark />,
      meta: {
        type: new OtherTextType(),
      },
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
        type: new NumericTextType(),
      },
    }),
    columnHelper.accessor('inflow', {
      id: 'inflow',
      header: () => 'INFLOW',
      cell: info => info.renderValue(),
      meta: {
        type: new NumericTextType(),
      },
    }),
    columnHelper.accessor('creditIcon', {
      id: 'creditIcon',
      header: () => <AiFillCopyrightCircle />,
      cell: info => (info.getValue() ? <AiFillCopyrightCircle /> : ''),
      meta: {
        type: new OtherTextType(),
      },
    }),
  ];

  // OPERATORS

  return [
    {
      columns,
      data,
    },
    {},
  ];
}
