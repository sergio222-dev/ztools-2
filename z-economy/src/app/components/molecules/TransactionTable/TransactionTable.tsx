import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useMemo } from 'react';
import styles from './Table.module.scss';

interface TransactionTableProperties<T> {
  columns: ColumnDef<T, any>[];
  data: Array<T>;
}

export function TransactionTable<T>({ columns, data }: TransactionTableProperties<T>) {
  const memoData = useMemo(() => data, []);

  const table = useReactTable({
    columns,
    data: memoData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={styles.z_table}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                className = {styles.z_table_head}
                key = {header.id}
                data-type = {header.column.columnDef.meta?.type === 'other' ? 'other' : header.column.columnDef.meta?.type ?? 'text'}
              >
                {header.isPlaceholder
                  ? undefined
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className={styles.z_table_row}>
            {row.getVisibleCells().map(cell => (
              <td
                className = {styles.z_table_cell}
                data-type = {cell.column.columnDef.meta?.type === 'other' ? 'other' : cell.column.columnDef.meta?.type ?? 'text'}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
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
