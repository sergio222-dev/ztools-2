import { Cell, ColumnDef, createColumnHelper, Row, Table, useReactTable } from '@tanstack/react-table';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { IndeterminateCheckbox } from '@molecules/IndeterminateCheckbox/IndeterminateCheckbox';
import { NumericTextType, OtherTextType } from '@utils/table/types';
import { EditableCell } from '@molecules/EditableCell/EditableCell';
import { format } from 'date-fns';
import { useMemo, useRef, useState } from 'react';
import { useTransaction } from '@core/budget/transaction/application/adapters/useTransaction';
import { useOutsideClick } from '@utils/mouseUtils';

export const useTransactionTableHook = () => {
  // STATE
  const [editingRow, setEditingRow] = useState('');
  const editableValue = useRef<(object & { [key: string]: string }) | (Transaction & { [key: string]: any })>(
    {},
  );
  const reference = useRef<HTMLElement>(null);
  const tableReference = useRef<Table<Transaction>>();

  // SERVICES
  const { data, updateData } = useTransaction();

  // HANDLERS
  const handleOnEdit = (
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
    editableValue.current = {};
    table.getIsSomeRowsExpanded() && table.toggleAllRowsExpanded(false);
    table.getIsSomeRowsSelected() && table.toggleAllRowsSelected(false);
    row.toggleSelected();
  };

  const handleSaveEdit = (row: Row<Transaction>) => {
    void updateData(editableValue.current as Transaction);
    editingRow !== '' && setEditingRow('');
    // setEditableValue({});
    editableValue.current = {};
    row.toggleExpanded(false);
    row.toggleSelected(false);
  };

  const handleCancelEdit = (row: Row<Transaction>) => {
    editingRow !== '' && setEditingRow('');
    row.toggleExpanded(false);
    row.toggleSelected(false);
  };

  // SIDE EFFECTS
  useOutsideClick(reference, () => {
    if (editingRow !== '') setEditingRow('');
    if (tableReference.current && tableReference.current?.getIsSomeRowsExpanded())
      tableReference.current.toggleAllRowsExpanded(false);
  });

  // COLUMNS
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

  return {
    columns,
    tableReference,
    reference,
    data,
    handleOnEdit,
    handleSaveEdit,
    handleCancelEdit,
  };
};
