import { ColumnDef, createColumnHelper, Row, Table } from '@tanstack/react-table';
import { IndeterminateCheckbox } from '@molecules/index';
import { NumericTextType, OtherTextType } from '@utils/table/types';
// import { ImBookmark } from 'react-icons/im';
// import { AiFillCopyrightCircle } from 'react-icons/ai';
// import { Labels } from '@utils/Labels';
// import styles from './AllAccountsPage.module.scss';
import { useTransaction } from '@core/budget/transactions/application/adapters/useTransaction';
import { Transaction } from '@core/budget/transactions/domain/Transaction';
import { format } from 'date-fns';

// hardcodear category y traer el resto de la data del bakckend con useTransaction().

// export type TransactionTableData = {
//   // flagMark: Labels | undefined;
//   _id: string;
//   date: string;
//   payee: string;
//   category: string;
//   memo: string;
//   outflow: string;
//   inflow: string;
//   // creditIcon: boolean;
// };

// const originalData: TransactionTableData[] = [];

// for (let index = 0; index < 7; index++) {
//   originalData.push({
//     // flagMark: undefined,
//     date: `19/07/190${index}`,
//     payee: `Person ${index}`,
//     category: `Category ${index}`,
//     memo: `Random words ${index}`,
//     outflow: (10 + index).toString(),
//     inflow: (100 + index).toString(),
//     // creditIcon: false,
//   });
// }

interface AllAccountPageModel {
  columns: ColumnDef<Transaction, any>[];
  loadedData: Transaction[];
  error: any;
}

export function useAllAccountPagePresenter(): [AllAccountPageModel, object] {
  // const { data: data2 } = useTransaction();
  //
  // console.log(data2);

  // MODEL

  const { data, error, isLoading } = useTransaction();
  const loadedData = isLoading ? [] : error ? [] : (data as Transaction[]);

  const columnHelper = createColumnHelper<Transaction>();
  const columns: ColumnDef<Transaction, any>[] = [
    {
      id: 'select',
      header: ({ table }: { table: Table<Transaction> }) => (
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
      cell: ({ row }: { row: Row<Transaction> }) => (
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
    // columnHelper.accessor('flagMark', {
    //   id: 'flagMark',
    //   header: () => <ImBookmark className={styles.flag_mark} />,
    //   cell: () => <ImBookmark />,
    //   meta: {
    //     type: new OtherTextType(),
    //   },
    // }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => 'DATE',
      cell: info => format(new Date(info.getValue()), 'dd/MM/yyyy'),
    }),
    columnHelper.accessor('payee', {
      id: 'payee',
      header: () => 'PAYEE',
      cell: info => info.renderValue(),
    }),
    // columnHelper.accessor('category', {
    //   id: 'category',
    //   header: () => 'CATEGORY',
    //   cell: info => info.renderValue(),
    // }),
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
    // columnHelper.accessor('creditIcon', {
    //   id: 'creditIcon',
    //   header: () => <AiFillCopyrightCircle />,
    //   cell: info => (info.getValue() ? <AiFillCopyrightCircle /> : ''),
    //   meta: {
    //     type: new OtherTextType(),
    //   },
    // }),
  ];

  // OPERATORS

  return [
    {
      columns,
      loadedData,
      error,
    },
    {},
  ];
}
