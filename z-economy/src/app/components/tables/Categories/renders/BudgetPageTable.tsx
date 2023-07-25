import { useState } from 'react';
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
  flexRender,
} from '@tanstack/react-table';
import styles from './CategoryTable.module.scss';

interface CategoryTableProperties<T> {
  columns: ColumnDef<T, unknown>[];
  data: Array<T>;
}

export function BudgetPageTable<T>({ columns, data }: CategoryTableProperties<T>) {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable<T>({
    columns,
    data: data,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getSubRows: row => row.subCategories,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
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
                  row.original.subCategories ? styles.z_table_expansible_row : styles.z_table_normal_row
                }
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <td
                      key={cell.id}
                      data-type={cell.column.columnDef.meta?.type.getType() ?? 'text'}
                      className={styles.z_table_cell}
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
    </div>
  );
}
