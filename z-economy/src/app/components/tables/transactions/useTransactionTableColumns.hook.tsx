import { CellContext, ColumnDef, createColumnHelper, Row, Table } from '@tanstack/react-table';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { IndeterminateCheckbox } from '@molecules/IndeterminateCheckbox/IndeterminateCheckbox';
import { NumericTextType, OtherTextType } from '@utils/table/types';
import { EditableCell } from '@molecules/EditableCell/EditableCell';
import { format } from 'date-fns';
import { KeyboardEvent, MutableRefObject } from 'react';
import { AiFillCopyrightCircle } from 'react-icons/ai';
import styles from './renders/Table.module.scss';
import cls from 'classnames';
import { EditableCellSelect } from '@molecules/EditableCell/EditableCellSelect';
import { SubCategory } from '@core/budget/category/domain/SubCategory';
import { EditableCellDatePicker } from '@molecules/EditableCell/EditableCellDatePicker';

export function useTransactionTableColumnsHook(
  data: Transaction[],
  handleHeaderCheckboxOnChange: (table: Table<Transaction>) => void,
  handleHeaderCheckboxOnKeyDown: (event: KeyboardEvent<HTMLInputElement>, table: Table<Transaction>) => void,
  handleCellCheckboxOnChange: (row: Row<Transaction>) => void,
  handleCheckboxOnKeyDown: (event: KeyboardEvent<HTMLInputElement>, row: Row<Transaction>) => void,
  handleSorting: (rowA: Row<Transaction>, rowB: Row<Transaction>, columnId: string) => number,
  handleClearedSorting: any,
  editableValue: MutableRefObject<Transaction>,
  editingRow: string,
  subCats: SubCategory[],
) {
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
              disabled: data[0]?.id === '',
              onKeyDown: event => {
                handleHeaderCheckboxOnKeyDown(event, table);
              },
              onChange: () => {
                handleHeaderCheckboxOnChange(table);
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
              disabled: !row.getCanSelect() || row.id === '',
              indeterminate: row.getIsSomeSelected(),
              onKeyDown: event => {
                handleCheckboxOnKeyDown(event, row);
              },
              onChange: () => {
                handleCellCheckboxOnChange(row);
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
      header: table => (table.column.getIsSorted() ? <strong> DATE </strong> : 'DATE'),
      cell: info => {
        return info.row.getIsSelected() ? (
          <EditableCellDatePicker
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current.date = value;
            }}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={format(new Date(info.getValue()), 'dd/MM/yyyy')} />
        );
      },
      sortingFn: (rowA, rowB, columnId) => handleSorting(rowA, rowB, columnId),
    }),
    columnHelper.accessor('payee', {
      id: 'payee',
      header: table => (table.column.getIsSorted() ? <strong> PAYEE </strong> : 'PAYEE'),
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current.payee = value;
            }}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={info.getValue()} />
        ),
      sortingFn: (rowA, rowB, columnId) => handleSorting(rowA, rowB, columnId),
    }),
    columnHelper.accessor('subCategoryId', {
      id: 'category',
      header: table => (table.column.getIsSorted() ? <strong> CATEGORY </strong> : 'CATEGORY'),
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCellSelect
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
            isEditable={editingRow === info.row.id}
            defaultValue={
              editingRow === info.row.id
                ? info.getValue()
                : subCats.find(item => item.id === info.row.original.subCategoryId)?.name
            }
            options={subCats}
            onChangeValue={value => {
              editableValue.current.subCategoryId = value;
            }}
          />
        ) : (
          <EditableCellSelect
            isEditable={false}
            defaultValue={subCats.find(item => item.id === info.row.original.subCategoryId)?.name}
          />
        ),
      sortingFn: (rowA, rowB, columnId) => handleSorting(rowA, rowB, columnId),
    }),
    columnHelper.accessor('memo', {
      id: 'memo',
      header: table => (table.column.getIsSorted() ? <strong> MEMO </strong> : 'MEMO'),
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
            isEditable={editingRow === info.row.id}
            defaultValue={editingRow === info.row.id ? info.row.original.memo : info.getValue()}
            onChangeValue={value => {
              editableValue.current.memo = value;
            }}
          />
        ) : (
          <EditableCell isEditable={false} defaultValue={info.getValue()} />
        ),
      sortingFn: (rowA, rowB, columnId) => handleSorting(rowA, rowB, columnId),
    }),
    columnHelper.accessor('outflow', {
      id: 'outflow',
      header: table => (table.column.getIsSorted() ? <strong> OUTFLOW </strong> : 'OUTFLOW'),
      cell: (info: CellContext<Transaction, any>) =>
        info.row.getIsSelected() ? (
          <EditableCell
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current.outflow = value;
              editableValue.current.inflow = '0';
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
      header: table => (table.column.getIsSorted() ? <strong> INFLOW </strong> : 'INFLOW'),
      cell: info =>
        info.row.getIsSelected() ? (
          <EditableCell
            shouldFocus={info.shouldFocus && info.selectedColumnId?.current === info.column.id}
            isEditable={editingRow === info.row.id}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editableValue.current.inflow = value;
              editableValue.current.outflow = '0';
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
    columnHelper.accessor('cleared', {
      id: 'cleared',
      header: () => <AiFillCopyrightCircle />,
      cell: info =>
        info.getValue() ? (
          <div className={cls('z_flex z_flex_jc_center', styles.z_table_cleared_icon)}>
            <AiFillCopyrightCircle />
          </div>
        ) : (
          <div className="z_flex z_flex_jc_center">
            <AiFillCopyrightCircle />
          </div>
        ),
      size: 30,
      minSize: 30,
      maxSize: 30,
      meta: {
        type: new OtherTextType(),
      },
      sortingFn: (rowA, rowB, columnId) => handleClearedSorting(rowA, rowB, columnId),
    }),
  ];

  return columns;
}
