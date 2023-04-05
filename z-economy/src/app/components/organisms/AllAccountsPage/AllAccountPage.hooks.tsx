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
import { useEffect, useState } from 'react';

// hardcodear category y traer el resto de la data del bakckend con useTransaction().

interface AllAccountPageModel {
  columns: ColumnDef<Transaction, any>[];
  loadedData: Transaction[];
  error: any;
}

interface AllAccountPageOperators {
  handleRowClick: (row: Row<Transaction>, table?: any, cell?: any) => void;
}

function EditableCell({ getValue, row: { index }, column: { id }, table }) {
  const initialValue = getValue;
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value as string} onChange={event => setValue(event.target.value)} onBlur={onBlur} />;
}

export function useAllAccountPagePresenter(): [AllAccountPageModel, AllAccountPageOperators] {
  // MODEL
  const [isInEditMode, setIsInEditMode] = useState(false);
  const { data, error, isLoading } = useTransaction();
  const loadedData = isLoading ? [] : error ? [] : (data as Transaction[]);

  const columnHelper = createColumnHelper<Transaction>();
  const columns: ColumnDef<Transaction, any>[] = [
    {
      accessorKey: 'checkbox',
      id: 'checkbox',
      header: ({ table }: { table: Table<Transaction> }) => (
        <div className="z_flex z_flex_jc_center">
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
              onClick: () => {
                setIsInEditMode(false);
              },
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
      cell: info =>
        info.row.getIsSelected() ? (
          isInEditMode ? (
            // <EditableCell
            //   getValue={format(new Date(info.getValue()), 'dd/MM/yyyy')}
            //   row={info.row}
            //   column={info.column}
            //   table={info.table}
            // />
            <input type="text" value={format(new Date(info.getValue()), 'dd/MM/yyyy')} readOnly />
          ) : (
            format(new Date(info.getValue()), 'dd/MM/yyyy')
          )
        ) : (
          format(new Date(info.getValue()), 'dd/MM/yyyy')
        ),
    }),
    columnHelper.accessor('payee', {
      id: 'payee',
      header: () => 'PAYEE',
      cell: info =>
        info.row.getIsSelected() ? (
          isInEditMode ? (
            <EditableCell getValue={info.getValue} row={info.row} column={info.column} table={info.table} />
          ) : (
            info.renderValue()
          )
        ) : (
          info.renderValue()
        ),
    }),
    columnHelper.accessor('category', {
      id: 'category',
      header: () => 'CATEGORY',
      cell: info =>
        info.row.getIsSelected() ? (
          isInEditMode ? (
            <EditableCell getValue={info.getValue} row={info.row} column={info.column} table={info.table} />
          ) : (
            info.renderValue()
          )
        ) : (
          info.renderValue()
        ),
    }),
    columnHelper.accessor('memo', {
      id: 'memo',
      header: () => 'MEMO',
      cell: info =>
        info.row.getIsSelected() ? (
          isInEditMode ? (
            <EditableCell getValue={info.getValue} row={info.row} column={info.column} table={info.table} />
          ) : (
            info.renderValue()
          )
        ) : (
          info.renderValue()
        ),
    }),
    columnHelper.accessor('outflow', {
      id: 'outflow',
      header: () => 'OUTFLOW',
      cell: info =>
        info.row.getIsSelected() ? (
          isInEditMode ? (
            <EditableCell getValue={info.getValue} row={info.row} column={info.column} table={info.table} />
          ) : (
            info.renderValue()
          )
        ) : (
          info.renderValue()
        ),
      meta: {
        type: new NumericTextType(),
      },
    }),
    columnHelper.accessor('inflow', {
      id: 'inflow',
      header: () => 'INFLOW',
      cell: info =>
        info.row.getIsSelected() ? (
          isInEditMode ? (
            <EditableCell getValue={info.getValue} row={info.row} column={info.column} table={info.table} />
          ) : (
            info.renderValue()
          )
        ) : (
          info.renderValue()
        ),
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

  const handleRowClick = (row: Row<Transaction>, table: any, cell: { id: string }) => {
    if (cell.id.includes('checkbox')) {
      setIsInEditMode(false);
      row.toggleSelected();
    } else if (row.getIsSelected() && !isInEditMode) {
      table.toggleAllRowsSelected(false);
      setTimeout(() => {
        row.toggleSelected();
      }, 1);
      setIsInEditMode(true);
    } else if (isInEditMode && !row.getIsSelected()) {
      table.toggleAllRowsSelected(false);
      row.toggleSelected();
      setIsInEditMode(false);
    } else if (!row.getIsSelected()) {
      table.toggleAllRowsSelected(false);
      row.toggleSelected();
      setIsInEditMode(false);
    }
  };

  return [
    {
      columns,
      loadedData,
      error,
    },
    {
      handleRowClick,
    },
  ];
}
