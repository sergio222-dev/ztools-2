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
import { ChangeEvent, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import { Input } from '../../atoms';
import { EditableCell2 } from '@molecules/EditableCell/EditableCell';
import { useOutsideClick } from '@utils/mouseUtils';

// hardcodear category y traer el resto de la data del bakckend con useTransaction().

interface AllAccountPageModel {
  columns: ColumnDef<Transaction, any>[];
  loadedData: Transaction[];
  error: any;
  reference: RefObject<HTMLElement>;
  tableReference: MutableRefObject<Table<Transaction> | undefined>;
  renderSubComponent: (
    { row }: { row: Row<Transaction> },
    subComponentClickHandler: (argument0: Row<Transaction>) => void,
  ) => JSX.Element;
}

interface AllAccountPageOperators {
  handleRowClick: (row: Row<Transaction>, table?: any, cell?: any) => void;
  subComponentClickHandler: (row: Row<Transaction>) => void;
}

// eslint-disable-next-line react/prop-types,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
function EditableCell({ getValue, row: { index }, column: { id }, table }) {
  const initialValue = getValue;
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const handleOnBlur = () => {
    // eslint-disable-next-line react/prop-types
    table.options.meta?.updateData(index, id, value);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <Input defaultValue={value} onChange={handleOnChange} onBlur={handleOnBlur} />;
}

const renderSubComponent = (
  { row }: { row: Row<Transaction> },
  subComponentClickHandler: (argument0: Row<Transaction>) => void,
) => {
  return (
    <div key={row.id} className="z_flex z_flex_jc_right" onClick={() => subComponentClickHandler(row)}>
      <button key={row.id + 'cancelButton'}>cancel</button>
      <button key={row.id + 'save'} onClick={() => console.log('saved')}>
        save
      </button>
    </div>
  );
};
export function useAllAccountPagePresenter(): [AllAccountPageModel, AllAccountPageOperators] {
  // MODEL
  const [isInEditMode, setIsInEditMode] = useState(false);
  const { data, error, isLoading } = useTransaction();
  const reference = useRef<HTMLElement>(null);
  const tableReference = useRef<Table<Transaction>>();
  const loadedData = isLoading ? [] : error ? [] : (data as Transaction[]);

  useOutsideClick(reference, () => {
    setIsInEditMode(false);
    tableReference.current && tableReference.current.toggleAllRowsExpanded(false);
  });

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
                table.toggleAllRowsExpanded(false);
              },
            }}
          />
        </div>
      ),
      cell: ({ row, table }: { row: Row<Transaction>; table: Table<Transaction> }) => (
        <div className="z_flex z_flex_jc_center">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
              onClick: () => {
                table.toggleAllRowsExpanded(false);
              },
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
            info.getValue()
          )
        ) : (
          info.getValue()
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
            info.getValue()
          )
        ) : (
          info.getValue()
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
            info.getValue()
          )
        ) : (
          info.getValue()
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
            info.getValue()
          )
        ) : (
          info.getValue()
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
            info.getValue()
          )
        ) : (
          info.getValue()
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

  const handleRowClick = (row: Row<Transaction>, table: Table<Transaction>, cell: { id: string }) => {
    if (cell.id.includes('checkbox')) {
      setIsInEditMode(false);
      table.toggleAllRowsExpanded(false);
      row.toggleSelected();
    } else if (row.getIsSelected() && !isInEditMode) {
      table.toggleAllRowsSelected(false);
      setTimeout(() => {
        row.toggleSelected();
      }, 1);
      setIsInEditMode(true);
      row.toggleExpanded(true);
    } else if (isInEditMode && !row.getIsSelected()) {
      table.toggleAllRowsSelected(false);
      row.toggleSelected();
      setIsInEditMode(false);
      table.toggleAllRowsExpanded(false);
    } else if (!row.getIsSelected()) {
      table.toggleAllRowsSelected(false);
      row.toggleSelected();
      setIsInEditMode(false);
    }
  };

  const subComponentClickHandler = (row: Row<Transaction>) => {
    row.toggleExpanded(false);
    setIsInEditMode(false);
  };

  return [
    {
      columns,
      loadedData,
      error,
      renderSubComponent,
      reference,
      tableReference,
    },
    {
      handleRowClick,
      subComponentClickHandler,
    },
  ];
}
