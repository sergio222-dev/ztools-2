import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import styles from './Table.module.scss';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

interface TransactionTableProperties<T> {
  columns: ColumnDef<T, unknown>[];
  data: Array<T>;
}

export function TransactionTable<T>({ columns, data }: TransactionTableProperties<T>) {
  const memoData = useMemo(() => data, [data]);

  const table = useReactTable<T>({
    columns,
    data: memoData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className={styles.z_table}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                className={styles.z_table_head}
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
                    {{
                      asc: <AiFillCaretUp className={styles.z_sorting_icon} />,
                      desc: <AiFillCaretDown className={styles.z_sorting_icon} />,
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
          <tr key={row.id} className={styles.z_table_row}>
            {row.getVisibleCells().map(cell => (
              <td
                className={styles.z_table_cell}
                data-type={cell.column.columnDef.meta?.type.getType() ?? 'text'}
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
