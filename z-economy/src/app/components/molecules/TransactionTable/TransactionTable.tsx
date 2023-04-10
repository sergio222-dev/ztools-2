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
import { EditableFooterButtons } from '@molecules/EditableFooterButtons/EditableFooterButtons';
import { Transaction } from '@core/budget/transactions/domain/Transaction';

// interface SubComponentProperties<T> {
//   onSave: () => void;
//   onCancel: () => void;
// }

interface TransactionTableProperties<T> {
  tableReference: MutableRefObject<Table<T> | undefined>;
  columns: ColumnDef<T, unknown>[];
  data: Array<T>;
  operators: TransactionOperators<T>;
}

interface TransactionOperators<T> {
  EditableFooterSaveHandler: (row: Row<Transaction>) => void;
  EditableFooterCancelHandler: (row: Row<Transaction>) => void;
  handleClickRow: (row: Row<T>, table: Table<T>, cell: Cell<T, string>) => void;
}

export function TransactionTable<T>({
  columns,
  data,
  tableReference,
  operators,
}: TransactionTableProperties<T>) {
  // STATE
  const memoData = useMemo(() => data, [data]);
  const [tableData, setTableData] = useState(memoData);

  // TABLE
  const table = useReactTable<T>({
    data: tableData,
    columns,
    enableMultiRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    meta: {
      updateData: (rowIndex: number, columnId: any, value: any) => {
        setTableData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
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
              >
                {header.isPlaceholder ? undefined : (
                  <div
                    {...{
                      className: header.column.getCanSort() ? 'z_cursor_pointer z_select_none' : '',
                      onClick: header.column.getToggleSortingHandler(),
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
                    operators.handleClickRow && operators.handleClickRow(row, table, cell);
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
                    operators.EditableFooterSaveHandler;
                  }}
                  onCancel={() => {
                    operators.EditableFooterCancelHandler;
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
