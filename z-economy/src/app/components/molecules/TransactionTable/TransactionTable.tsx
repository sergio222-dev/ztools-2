import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import styles from './Table.module.scss';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

interface TransactionTableProperties<T> {
  columns: ColumnDef<T, unknown>[];
  // data: Array<T>;
  data: Array<T>;

  operators: any;
}

export function TransactionTable<T>({ columns, data, operators }: TransactionTableProperties<T>) {
  const memoData = useMemo(() => data, [data]);
  const [tableData, setTableData] = useState(memoData);

  useEffect(() => {
    setTableData(memoData);
  }, [memoData]);

  const handleRowClick = operators.handleRowClick;

  const table = useReactTable<T>({
    data: tableData,
    columns,
    enableMultiRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
          <tr
            key={row.id}
            className={row.getIsSelected() ? styles.z_table_row_selected : styles.z_table_row_unselected}
          >
            {row.getVisibleCells().map(cell => (
              <td
                className={styles.z_table_cell}
                data-type={cell.column.columnDef.meta?.type.getType() ?? 'text'}
                key={cell.id}
                onClick={() => {
                  handleRowClick(row, table, cell);
                }}
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
