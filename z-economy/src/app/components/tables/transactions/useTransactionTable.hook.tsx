import { Cell, CellContext, ColumnDef, createColumnHelper, Row, Table } from '@tanstack/react-table';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { IndeterminateCheckbox } from '@molecules/IndeterminateCheckbox/IndeterminateCheckbox';
import { NumericTextType, OtherTextType } from '@utils/table/types';
import { EditableCell } from '@molecules/EditableCell/EditableCell';
import { format } from 'date-fns';
import { KeyboardEvent, MutableRefObject, useRef, useState } from 'react';
import { useTransaction } from '@core/budget/transaction/application/adapters/useTransaction';
import { useOutsideClick } from '@utils/mouseUtils';
import { v4 as uuidv4 } from 'uuid';
import { chunkify, normalizeText } from '@utils/TextUtils';

export const useTransactionTableHook = () => {
  // STATE
  const [editingRow, setEditingRow] = useState('');
  const editableValue = useRef<(object & { [key: string]: string }) | (Transaction & { [key: string]: any })>(
    {},
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line unicorn/no-useless-undefined
  const reference = useRef<HTMLDivElement>(undefined);
  const tableReference = useRef<Table<Transaction>>();

  // SERVICES
  const { data, updateData, createData, trigger, deleteFakeRow } = useTransaction();

  // HANDLERS
  const handleOnEdit = (
    row: Row<Transaction>,
    table: Table<Transaction>,
    cell: Cell<Transaction, string>,
    selectedColumnId: MutableRefObject<string>,
  ) => {
    if (cell.id.includes('checkbox')) {
      if (row.getIsSelected()) {
        row.getIsExpanded() && row.toggleExpanded(false);
      }
      editingRow === row.id && setEditingRow('');
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
      selectedColumnId.current = cell.column.id;
      return;
    }
    editingRow !== '' && setEditingRow('');
    editableValue.current = {};
    deleteFakeRow(false);
    table.getIsSomeRowsExpanded() && table.toggleAllRowsExpanded(false);
    table.getIsSomeRowsSelected() && table.toggleAllRowsSelected(false);
    selectedColumnId.current = 'date';
    row.toggleSelected();
  };

  const handleSaveEdit = (row: Row<Transaction>, selectedColumnId: { current: string }) => {
    if (row.id === '') {
      editableValue.current.id = uuidv4();
      editableValue.current.budgetId = uuidv4();
      if (editableValue.current.inflow === '') editableValue.current.inflow = '0';
      if (editableValue.current.outflow === '') editableValue.current.outflow = '0';
      void createData(editableValue.current as Transaction);
      editingRow !== '' && setEditingRow('');
      editableValue.current = {};
      selectedColumnId.current = 'date';
      row.toggleExpanded(false);
      row.toggleSelected(false);
      return;
    }
    void updateData(editableValue.current as Transaction);
    editingRow !== '' && setEditingRow('');
    editableValue.current = {};
    selectedColumnId.current = 'date';
    row.toggleExpanded(false);
    row.toggleSelected(false);
  };

  const handleCancelEdit = (row: Row<Transaction>, selectedColumnId: { current: string }) => {
    editingRow !== '' && setEditingRow('');
    selectedColumnId.current = 'date';
    row.toggleExpanded(false);
    deleteFakeRow(false);
  };

  const handleCheckboxOnKeyDown = (event: KeyboardEvent<HTMLInputElement>, row: Row<Transaction>) => {
    if (row.getIsSelected() && event.key === 'Enter' && editingRow === '') {
      setEditingRow(row.id);
      tableReference.current?.toggleAllRowsSelected(false);
      tableReference.current?.setRowSelection(() => ({
        [row.id]: true,
      }));
      tableReference.current?.setExpanded(() => ({
        [row.id]: true,
      }));
      return;
    }
    if (editingRow !== row.id && event.key === 'Enter') {
      row.getToggleSelectedHandler()(row);
      return;
    }
    if (editingRow === '' && event.key === 'Enter') {
      row.getToggleSelectedHandler()(row);
      return;
    }
  };

  const handleHeaderCheckboxOnCLick = (table: Table<Transaction>) => {
    editingRow !== '' && setEditingRow('');
    table.toggleAllRowsExpanded(false);
  };

  const handleCellCheckboxOnClick = (row: Row<Transaction>) => {
    if (editingRow !== '' && editingRow === row.id) {
      setEditingRow('');
    }
  };

  const handleRowOnKeyDown = (
    event: KeyboardEvent,
    row: Row<Transaction>,
    selectedColumnId: { current: string },
  ) => {
    if (event.key === 'Escape' && editingRow === row.id) {
      handleCancelEdit(row, selectedColumnId);
    }
  };

  const handleSorting = (rowA: Row<Transaction>, rowB: Row<Transaction>, columnId: string) => {
    if (rowA.id === '' || rowB.id === '') return 0;

    const a: string = rowA.getValue(columnId);
    const b: string = rowB.getValue(columnId);

    if (a === undefined || b === undefined) return 0;

    const lowerA = normalizeText(a);
    const lowerB = normalizeText(b);

    if (lowerA === lowerB) {
      return 0;
    }

    const chunkedA = chunkify(lowerA);
    const chunkedB = chunkify(lowerB);

    for (let index = 0; index < Math.max(chunkedA.length, chunkedB.length); index++) {
      const aChunk = chunkedA[index] || '';
      const bChunk = chunkedB[index] || '';

      const aNumber = Number.parseInt(aChunk, 10);
      const bNumber = Number.parseInt(bChunk, 10);

      if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
        if (aNumber !== bNumber) {
          return aNumber - bNumber;
        }
      } else if (aChunk !== bChunk) {
        return aChunk < bChunk ? -1 : 1;
      }
    }
    return 0;
  };

  // SIDE EFFECTS
  useOutsideClick(reference, () => {
    if (editingRow !== '') setEditingRow('');
    if (tableReference.current && tableReference.current?.getIsSomeRowsExpanded())
      tableReference.current.toggleAllRowsExpanded(false);
    deleteFakeRow(false);
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
                handleHeaderCheckboxOnCLick(table);
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
              onKeyDown: event => {
                handleCheckboxOnKeyDown(event, row);
              },
              onChange: row.getToggleSelectedHandler(),
              onClick: () => {
                handleCellCheckboxOnClick(row);
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
      cell: info => {
        return info.row.getIsSelected() ? (
          <EditableCell
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
            isEditable={editingRow === info.row.id}
            defaultValue={format(new Date(info.getValue()), 'dd/MM/yyyy')}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={format(new Date(info.getValue()), 'dd/MM/yyyy')} />
        );
      },
      sortingFn: (rowA, rowB, columnId) => handleSorting(rowA, rowB, columnId),
    }),
    columnHelper.accessor('payee', {
      id: 'payee',
      header: () => 'PAYEE',
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current[info.column.id] = value;
            }}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={info.getValue()} />
        ),
      sortingFn: (rowA, rowB, columnId) => handleSorting(rowA, rowB, columnId),
    }),
    columnHelper.accessor('category', {
      id: 'category',
      header: () => 'CATEGORY',
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current[info.column.id] = value;
            }}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={info.getValue()} />
        ),
      sortingFn: (rowA, rowB, columnId) => handleSorting(rowA, rowB, columnId),
    }),
    columnHelper.accessor('memo', {
      id: 'memo',
      header: () => 'MEMO',
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current[info.column.id] = value;
            }}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={info.getValue()} />
        ),
      sortingFn: (rowA, rowB, columnId) => handleSorting(rowA, rowB, columnId),
    }),
    columnHelper.accessor('outflow', {
      id: 'outflow',
      header: () => 'OUTFLOW',
      cell: (info: CellContext<Transaction, any>) =>
        info.row.getIsSelected() ? (
          <EditableCell
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
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
      sortingFn: (rowA, rowB, columnId) => handleSorting(rowA, rowB, columnId),
    }),
    columnHelper.accessor('inflow', {
      id: 'inflow',
      header: () => 'INFLOW',
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
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
      sortingFn: (rowA, rowB, columnId) => handleSorting(rowA, rowB, columnId),
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
    editableValue,
    setEditingRow,
    handleOnEdit,
    handleSaveEdit,
    handleCancelEdit,
    trigger,
    handleRowOnKeyDown,
  };
};
