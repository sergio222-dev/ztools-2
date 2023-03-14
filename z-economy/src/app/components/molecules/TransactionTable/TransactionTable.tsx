import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useMemo } from 'react';
import styles from './Table.module.scss';

interface TransactionTableProperties<T> {
  columns: ColumnDef<T, string>[];
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
    <table className={styles.z_table} style={{ width: '100%' }}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                className={styles.z_table_head}
                key={header.id}
                data-type={header.column.columnDef.meta?.type ?? 'text'}
                style={{
                  textAlign: header.column.columnDef.meta?.type === 'numeric' ? 'right' : 'left',
                }}
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
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td
                style={{
                  textAlign: cell.column.columnDef.meta?.type === 'numeric' ? 'right' : 'left',
                }}
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
