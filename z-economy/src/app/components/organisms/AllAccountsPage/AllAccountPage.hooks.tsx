import { Cell, ColumnDef, createColumnHelper, Row, Table } from '@tanstack/react-table';
import { IndeterminateCheckbox } from '@molecules/index';
import { NumericTextType, OtherTextType } from '@utils/table/types';
import { useTransaction } from '@core/budget/transaction/application/adapters/useTransaction';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { format } from 'date-fns';
import { ChangeEvent, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import { EditableCell } from '@molecules/EditableCell/EditableCell';
import { useOutsideClick } from '@utils/mouseUtils';
import { T } from 'vitest/dist/types-5872e574';

interface AllAccountPageModel {
  columns: ColumnDef<Transaction, any>[];
  loadedData: Transaction[];
  error: any;
  reference: RefObject<HTMLElement>;
  tableReference: MutableRefObject<Table<Transaction> | undefined>;
}

interface AllAccountPageOperators {
  EditableFooterSaveHandler: (row: Row<Transaction>, table: Table<Transaction>) => void;
  EditableFooterCancelHandler: (row: Row<Transaction>) => void;
  handleRowClick: (row: Row<Transaction>, table: Table<Transaction>, cell: Cell<Transaction, string>) => void;
}

export function useAllAccountPageHooks(): [AllAccountPageModel, AllAccountPageOperators] {
  // MODEL
  const [editingRow, setEditingRow] = useState('');
  // const [editableValue, setEditableValue] = useState<Transaction | object>({});
  // const editableValue = useRef<Transaction | object>({});

  const editableValue = useRef<(object & { [key: string]: string }) | (Transaction & { [key: string]: any })>(
    {},
  );

  const { data, error, isLoading, updateData, createData } = useTransaction();
  const reference = useRef<HTMLElement>(null);
  const tableReference = useRef<Table<Transaction>>();
  const loadedData = isLoading ? [] : error ? [] : (data as Transaction[]);

  useOutsideClick(reference, () => {
    if (editingRow !== '') setEditingRow('');
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
                editingRow !== '' && setEditingRow('');
                table.toggleAllRowsExpanded(false);
              },
            }}
          />
        </div>
      ),
      size: 30,
      minSize: 30,
      maxSize: 30,
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
            isEditable={editingRow === info.row.id}
            defaultValue={format(new Date(info.getValue()), 'dd/MM/yyyy')}
            // onChangeValue={value => {
            //   setEditableValue({
            //     ...editableValue,
            //     [info.column.id]: value,
            //   });
            // }}
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
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current[info.column.id] = value;
            }}
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
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current[info.column.id] = value;
            }}
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
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current[info.column.id] = value;
            }}
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
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current[info.column.id] = value;
            }}
            type={new NumericTextType().getType()}
          />
        ) : (
          <EditableCell
            isEditable={false}
            defaultValue={info.getValue()}
            type={new NumericTextType().getType()}
          />
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
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current[info.column.id] = value;
            }}
            type={new NumericTextType().getType()}
          />
        ) : (
          <EditableCell
            isEditable={false}
            defaultValue={info.getValue()}
            type={new NumericTextType().getType()}
          />
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
  const handleRowClick = (
    row: Row<Transaction>,
    table: Table<Transaction>,
    cell: Cell<Transaction, string>,
  ) => {
    if (cell.id.includes('checkbox')) {
      if (row.getIsSelected()) {
        row.getIsExpanded() && row.toggleExpanded(false);
      }
      row.toggleSelected();
      return;
    }
    if (row.getIsSelected()) {
      editingRow !== row.id && setEditingRow(row.id);
      // setEditableValue(row.original);
      editableValue.current = row.original;
      table.setExpanded(() => ({
        [row.id]: true,
      }));
      table.setRowSelection(() => ({
        [row.id]: true,
      }));
      return;
    }
    editingRow !== '' && setEditingRow('');
    // setEditableValue({});
    editableValue.current = {};
    table.getIsSomeRowsExpanded() && table.toggleAllRowsExpanded(false);
    table.getIsSomeRowsSelected() && table.toggleAllRowsSelected(false);
    row.toggleSelected();
  };

  const EditableFooterSaveHandler = (row: Row<Transaction>) => {
    void updateData(editableValue.current as Transaction);
    editingRow !== '' && setEditingRow('');
    // setEditableValue({});
    editableValue.current = {};
    row.toggleExpanded(false);
    row.toggleSelected(false);
  };

  const EditableFooterCancelHandler = (row: Row<Transaction>) => {
    editingRow !== '' && setEditingRow('');
    row.toggleExpanded(false);
    row.toggleSelected(false);
  };

  // SIDE EFFECTS
  // useEffect(() => {
  //   if (editingRow === '') return;
  //
  //   void updateData(editableValue as Transaction);
  // }, [editableValue]);

  return [
    {
      columns,
      loadedData,
      error,
      reference,
      tableReference,
    },
    {
      handleRowClick,
      EditableFooterSaveHandler,
      EditableFooterCancelHandler,
    },
  ];
}
