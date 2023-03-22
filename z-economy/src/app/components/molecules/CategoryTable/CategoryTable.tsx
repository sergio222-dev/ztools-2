import { useState, useMemo } from 'react';
import {
  ColumnDef,
  ExpandedState,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { IndeterminateCheckbox } from '../index';
import { NumericTextType } from '@utils/table/types';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai';
import styles from './CategoryTable.module.scss';

export type Category = {
  category: string;
  assigned: string;
  activity: string;
  available: string;
  subRows?: Category[];
};

const range = (length: number) => {
  const array = [];
  for (let index = 0; index < length; index++) {
    array.push(index);
  }
  return array;
};

const newCategory = (): Category => {
  return {
    category: 'Bills',
    assigned: '$100.000',
    activity: '$0.00',
    available: '$0.00',
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Category[] => {
    const length = lens[depth]!;
    return range(length).map((): Category => {
      return {
        ...newCategory(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

//----------------------------------------------------------------------------------------

export function CategoryTable() {
  const data = makeData(5, 3);
  const memoData = useMemo(() => data, [data]);
  const columnHelper = createColumnHelper<Category>();
  const columns: ColumnDef<Category, any>[] = [
    {
      accessorKey: 'category',
      header: ({ table }) => (
        <div className="z_flex z_flex_jc_left z_flex_ai_center">
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
          <button
            {...{
              onClick: table.getToggleAllRowsExpandedHandler(),
              className: styles.category_expand_button,
            }}
          >
            {table.getIsAllRowsExpanded() ? <AiFillCaretDown /> : <AiFillCaretRight />}
          </button>
          <span className="z_flex z_flex_ai_center">CATEGORY</span>
        </div>
      ),
      cell: ({ row, getValue }) => (
        <div
          // style={{
          //   // Since rows are flattened by default,
          //   // we can use the row.depth property
          //   // and paddingLeft to visually indicate the depth
          //   // of the row
          //   paddingLeft: `${row.depth * 2}rem`,
          // }}
          className="z_flex z_flex_jc_left z_flex_ai_center"
        >
          <>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
            {row.getCanExpand() && (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  className: styles.category_expand_button,
                }}
              >
                {row.getIsExpanded() ? <AiFillCaretDown /> : <AiFillCaretRight />}
              </button>
            )}
            <span
              className={row.getCanExpand() ? styles.z_table_expansible_row_name : styles.z_table_cell_text}
            >
              {getValue()}
            </span>
          </>
        </div>
      ),
      // footer: props => props.column.id,
    },
    columnHelper.accessor('assigned', {
      id: 'assigned',
      header: () => 'ASSIGNED',
      cell: info => info.getValue(),
      meta: {
        type: new NumericTextType(),
      },
    }),
    columnHelper.accessor('activity', {
      id: 'activity',
      header: () => 'ACTIVITY',
      cell: info => info.getValue(),
      meta: {
        type: new NumericTextType(),
      },
    }),
    columnHelper.accessor('available', {
      id: 'available',
      header: () => 'AVAILABLE',
      cell: info => info.getValue(),
      meta: {
        type: new NumericTextType(),
      },
    }),
  ];

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable<Category>({
    columns,
    data: memoData,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
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
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {/*{header.column.getCanFilter() ? (*/}
                        {/*    <div>*/}
                        {/*        <Filter column={header.column} table={table} />*/}
                        {/*    </div>*/}
                        {/*) : null}*/}
                      </div>
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
                className={row.getCanExpand() ? styles.z_table_expansible_row : styles.z_table_normal_row}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <td
                      key={cell.id}
                      data-type={cell.column.columnDef.meta?.type.getType() ?? 'text'}
                      className={styles.z_table_cell}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
