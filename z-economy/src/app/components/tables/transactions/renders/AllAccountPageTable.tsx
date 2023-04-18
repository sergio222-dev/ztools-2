import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getExpandedRowModel,
  Table,
  Row,
  Cell,
} from '@tanstack/react-table';
import { Fragment, MutableRefObject, useEffect, useMemo, useState } from 'react';
import styles from './Table.module.scss';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { EditableFooterButtons } from '../../../molecules/EditableFooterButtons/EditableFooterButtons';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import cls from 'classnames';

// interface SubComponentProperties<T> {
//   onSave: () => void;
//   onCancel: () => void;
// }

interface TransactionTableProperties {
  tableReference: MutableRefObject<Table<Transaction> | undefined>;
  columns: ColumnDef<Transaction, unknown>[];
  data: Array<Transaction>;
  operators: TransactionOperators;
}

interface TransactionOperators {
  EditableFooterSaveHandler: (row: Row<Transaction>, table: Table<Transaction>) => void;
  EditableFooterCancelHandler: (row: Row<Transaction>) => void;
  handleRowClick: (row: Row<Transaction>, table: Table<Transaction>, cell: Cell<Transaction, string>) => void;
}

export function AllAccountPageTable({
  columns,
  data,
  tableReference,
  handleSaveEdit,
  handleCancelEdit,
  handleOnEdit,
}: TransactionTableProperties) {
  // STATE
  const memoData = useMemo(() => data, [data]);
  const [tableData, setTableData] = useState(memoData);

  const columnResizeMode = 'onChange';
  // TABLE
  const table = useReactTable<T>({
    data: tableData,
    columns,
    columnResizeMode,
    enableMultiRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    debugTable: true,
  });

  if (tableReference) tableReference.current = table;

  // SIDE EFFECT posible loop infinito cuando se levanta el front primero y despues el server estando ya en all accounts page.
  useEffect(() => {
    setTableData(memoData);
  }, [memoData]);

  return (
    <table className={styles.z_table}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                className={styles.z_table_header}
                key={header.id}
                data-type={header.column.columnDef.meta?.type.getType() ?? 'text'}
                {...{
                  colSpan: header.colSpan,
                  style: {
                    width:
                      header.column.columnDef.meta?.type.getType() === 'other' ? undefined : header.getSize(),
                  },
                }}
              >
                {header.isPlaceholder ? undefined : (
                  <>
                    <div
                      {...{
                        // className: header.column.getCanSort() ? 'z_cursor_pointer z_select_none' : '',
                        className: cls(header.column.getCanSort() ? 'z_cursor_pointer z_select_none' : ''),
                        onClick: header.id.includes('checkbox')
                          ? undefined
                          : header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.id.includes('checkbox')
                        ? undefined
                        : {
                            asc: <AiFillCaretUp className={styles.z_sorting_icon} />,
                            desc: <AiFillCaretDown className={styles.z_sorting_icon} />,
                            // eslint-disable-next-line unicorn/no-null
                          }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {header.id.includes('checkbox') || header.id.includes('inflow') ? undefined : (
                      <div
                        {...{
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: cls(
                            styles.resizer,
                            header.column.getIsResizing() ? styles.isResizing : '',
                          ),
                          // style: {
                          //   transform:
                          //     columnResizeMode === 'onEnd' && header.column.getIsResizing()
                          //       ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
                          //       : '',
                          // },
                        }}
                      />
                    )}
                  </>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <Fragment key={row.id}>
            <tr className={row.getIsSelected() ? styles.z_table_row_selected : styles.z_table_row_unselected}>
              {row.getVisibleCells().map(cell => (
                <td
                  className={styles.z_table_cell}
                  data-type={cell.column.columnDef.meta?.type.getType() ?? 'text'}
                  key={cell.id}
                  onClick={() => {
                    handleOnEdit && handleOnEdit(row, table, cell);
                  }}
                  {...{
                    style: {
                      width: cell.column.getSize(),
                    },
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {row.getIsExpanded() && row.getIsSelected() && (
              <tr className={styles.z_table_subcomponent_tr}>
                {/* 2nd row is a custom 1 cell row */}
                <EditableFooterButtons
                  className={styles.z_table_subcomponent_cell}
                  onSave={() => {
                    handleSaveEdit(row, table);
                  }}
                  onCancel={() => {
                    handleCancelEdit(row);
                  }}
                />
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? undefined
                  : flexRender(header.column.columnDef.footer, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
