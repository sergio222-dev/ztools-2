import { Cell, ColumnDef, createColumnHelper, Row, Table } from '@tanstack/react-table';
import { IndeterminateCheckbox } from '@molecules/index';
import { NumericTextType, OtherTextType } from '@utils/table/types';
import { useTransaction } from '@core/budget/transactions/application/adapters/useTransaction';
import { Transaction } from '@core/budget/transactions/domain/Transaction';
import { format } from 'date-fns';
import { MutableRefObject, RefObject, useRef, useState } from 'react';
import { EditableCell } from '@molecules/EditableCell/EditableCell';
import { useOutsideClick } from '@utils/mouseUtils';
import { tr } from 'date-fns/locale';

interface AllAccountPageModel {
  columns: ColumnDef<Transaction, any>[];
  loadedData: Transaction[];
  error: any;
  reference: RefObject<HTMLElement>;
  tableReference: MutableRefObject<Table<Transaction> | undefined>;
}

interface AllAccountPageOperators {
  subComponentClickHandler: (row: Row<Transaction>) => void;
  handleClickRow: (row: Row<Transaction>, table: Table<Transaction>, cell: Cell<Transaction, string>) => void;
}

export function useAllAccountPageHooks(): [AllAccountPageModel, AllAccountPageOperators] {
  // MODEL
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [editingCell, setEditingCell] = useState('');
  const { data, error, isLoading } = useTransaction();
  const reference = useRef<HTMLElement>(null);
  const tableReference = useRef<Table<Transaction>>();
  const loadedData = isLoading ? [] : error ? [] : (data as Transaction[]);

  useOutsideClick(reference, () => {
    if (isInEditMode) setIsInEditMode(false);
    if (editingCell !== '') setEditingCell('');
    if (tableReference.current && tableReference.current?.getIsSomeRowsExpanded())
      tableReference.current.toggleAllRowsExpanded(false);
  });

  data?.map(transaction => {
    transaction.category = 'Entertainment';
  });

  const columnHelper = createColumnHelper<Transaction>();
  const columns: ColumnDef<Transaction, any>[] = [
    {
      accessorKey: 'checkbox',
      id: 'checkbox',
      header: ({ table }) => (
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
      cell: ({ row, table }) => (
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
          <EditableCell
            isEditable={isInEditMode && editingCell === info.row.id}
            defaultValue={format(new Date(info.getValue()), 'dd/MM/yyyy')}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={format(new Date(info.getValue()), 'dd/MM/yyyy')} />
        ),
    }),
    columnHelper.accessor('payee', {
      id: 'payee',
      header: () => 'PAYEE',
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            isEditable={isInEditMode && editingCell === info.row.id}
            defaultValue={info.getValue()}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={info.getValue()} />
        ),
    }),
    columnHelper.accessor('category', {
      id: 'category',
      header: () => 'CATEGORY',
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            isEditable={isInEditMode && editingCell === info.row.id}
            defaultValue={info.getValue()}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={info.getValue()} />
        ),
    }),
    columnHelper.accessor('memo', {
      id: 'memo',
      header: () => 'MEMO',
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            isEditable={isInEditMode && editingCell === info.row.id}
            defaultValue={info.getValue()}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={info.getValue()} />
        ),
    }),
    columnHelper.accessor('outflow', {
      id: 'outflow',
      header: () => 'OUTFLOW',
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            isEditable={isInEditMode && editingCell === info.row.id}
            defaultValue={info.getValue()}
            type={new NumericTextType().getType()}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={info.getValue()} />
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
          <EditableCell
            isEditable={isInEditMode && editingCell === info.row.id}
            defaultValue={info.getValue()}
            type={new NumericTextType().getType()}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={info.getValue()} />
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

  const handleClickRow = (
    row: Row<Transaction>,
    table: Table<Transaction>,
    cell: Cell<Transaction, string>,
  ) => {
    if (cell.id.includes('checkbox')) {
      row.toggleSelected();
      if (row.getIsSelected()) setEditingCell('');
      return;
    }
    if (row.getIsSelected()) {
      setEditingCell(row.id);
      setIsInEditMode(true);
      return;
    }
    table.toggleAllRowsSelected(false);
    row.toggleSelected();
    if (editingCell !== '') setEditingCell('');
    isInEditMode && setIsInEditMode(false);
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
      reference,
      tableReference,
    },
    {
      handleClickRow,
      subComponentClickHandler,
    },
  ];
}
