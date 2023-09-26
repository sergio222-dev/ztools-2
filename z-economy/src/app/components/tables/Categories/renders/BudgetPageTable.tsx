import { KeyboardEvent, MutableRefObject, useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
  flexRender,
  Row,
  Table,
  Cell,
} from '@tanstack/react-table';
import styles from './CategoryTable.module.scss';
import cls from 'classnames';

interface CategoryTableProperties<T> {
  columns: ColumnDef<T, unknown>[];
  data: Array<T>;
  handleOnEdit: (row: Row<T>, table: Table<T>, cell: Cell<T, string>) => void;
  tableReference: MutableRefObject<Table<T> | undefined>;
  handleRowOnKeyDown: (event: KeyboardEvent, row: Row<T>) => void;
}

export function BudgetPageTable<T>({
  columns,
  data,
  handleOnEdit,
  tableReference,
  handleRowOnKeyDown,
}: CategoryTableProperties<T>) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const memoData = useMemo(() => data, [data]);
  const [tableData, setTableData] = useState(memoData);

  const table = useReactTable<T>({
    columns,
    data: tableData,
    state: {
      expanded,
    },
    enableMultiRowSelection: true,
    onExpandedChange: setExpanded,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getSubRows: row => row.subCategories,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // debugTable: true,
  });

  if (tableReference) tableReference.current = table;
  // SIDE EFFECT
  useEffect(() => {
    setTableData(memoData);
  }, [memoData]);

  useEffect(() => {
    table.toggleAllRowsExpanded(true);
  }, []);

  return (
    <table className={styles.z_table}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th
                  className={styles.z_table_head}
                  key={header.id}
                  colSpan={header.colSpan}
                  data-type={header.column.columnDef.meta?.type.getType() ?? 'text'}
                >
                  {header.isPlaceholder ? undefined : (
                    <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => {
          return (
            <tr
              key={row.id}
              className={
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                row.original.subCategories
                  ? cls(styles.z_table_expansible_row, styles.c_table_row)
                  : row.getIsSelected()
                  ? styles.z_table_row_selected
                  : styles.z_table_row_unselected
              }
              onKeyDown={event => {
                handleRowOnKeyDown(event, row);
              }}
            >
              {row.getVisibleCells().map(cell => {
                return (
                  <td
                    key={cell.id}
                    data-type={cell.column.columnDef.meta?.type.getType() ?? 'text'}
                    className={styles.z_table_cell}
                    onClick={() => {
                      handleOnEdit(row, table, cell);
                    }}
                  >
                    <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
