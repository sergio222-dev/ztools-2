import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import {
  Dispatch,
  Fragment,
  KeyboardEvent,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './Table.module.scss';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { EditableFooterButtons } from '@molecules/EditableFooterButtons/EditableFooterButtons';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import cls from 'classnames';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtual } from '@tanstack/react-virtual';

interface TransactionTableProperties {
  tableReference: MutableRefObject<Table<Transaction> | undefined>;
  columns: ColumnDef<Transaction, unknown>[];
  tdata: Array<Transaction>;
  handleSaveEdit: (row: Row<Transaction>) => void;
  handleCancelEdit: (row: Row<Transaction>) => void;
  handleOnEdit: (row: Row<Transaction>, table: Table<Transaction>, cell: Cell<Transaction, unknown>) => void;
  handleRowOnKeyDown: (event: KeyboardEvent, row: Row<Transaction>) => void;
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  selectedColumnId: MutableRefObject<string>;
}

export type TransactionApiResponse = {
  data: Transaction[];
  meta: {
    totalRowCount: number;
  };
};

export function AllAccountPageTable({
  columns,
  tdata,
  tableReference,
  handleSaveEdit,
  handleCancelEdit,
  handleOnEdit,
  handleRowOnKeyDown,
  globalFilter,
  setGlobalFilter,
  selectedColumnId,
}: TransactionTableProperties) {
  // LOGIC

  const fetchSize = 1;

  const fetchData = (start: number, size: number) => {
    const databaseData = [...tdata];

    return {
      data: databaseData.slice(start, start + size),
      meta: {
        totalRowCount: databaseData.length,
      },
    };
  };

  const { fetchNextPage, isFetching, isLoading, data } = useInfiniteQuery<TransactionApiResponse>({
    queryKey: ['table-data', tdata],
    queryFn: ({ pageParam: pageParameter = 0 }) => {
      console.log('fetching', pageParameter);
      const start = (pageParameter as number) * fetchSize;
      return fetchData(start, fetchSize);
    },
    initialPageParam: 0,
    getNextPageParam: (_lastPage, allPages) => allPages.length,
    refetchOnWindowFocus: false,
  });

  const flatData = useMemo(() => data?.pages?.flatMap(page => page.data) ?? [], [data]);

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    (containerReferenceElement?: HTMLDivElement | null) => {
      if (containerReferenceElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerReferenceElement;
        console.log(scrollHeight, scrollTop, clientHeight);
        //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (scrollHeight - scrollTop - clientHeight < 300 && !isFetching && totalFetched < totalDBRowCount) {
          void fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  );

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerReference.current);
  }, [fetchMoreOnBottomReached]);

  // STATE
  const memoData = useMemo(() => flatData, [flatData]);
  const [tableData, setTableData] = useState(memoData);
  const tableContainerReference = useRef<HTMLDivElement>(null);

  // TABLE
  const columnResizeMode = 'onChange';
  const table = useReactTable<Transaction>({
    data: tableData,
    columns,
    getRowId: row => row.id,
    columnResizeMode,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    enableMultiRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // pageCount: 50,
    // manualPagination: true,
    getRowCanExpand: () => true,
    initialState: {
      sorting: [{ id: 'date', desc: true }],
    },
    debugTable: false,
  });

  if (tableReference) tableReference.current = table;

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerReference,
    size: rows.length,
    overscan: 10,
  });

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  // SIDE EFFECT
  useEffect(() => {
    setTableData(flatData);
  }, [flatData]);

  // LOCAL HANDLERS
  const cellOnClickHandler = (
    row: Row<Transaction>,
    table: Table<Transaction>,
    cell: Cell<Transaction, unknown>,
  ) => {
    handleOnEdit && handleOnEdit(row, table, cell);
  };

  return (
    <div
      className={cls('z_flex z_flex_grow_1', styles.z_table_container)}
      ref={tableContainerReference}
      onScroll={event => fetchMoreOnBottomReached(event.target as HTMLDivElement)}
    >
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
                        header.column.columnDef.meta?.type.getType() === 'other'
                          ? undefined
                          : header.getSize(),
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
          {virtualRows.map(virtualRow => {
            const row = rows[virtualRow.index] as Row<Transaction>;
            return (
              <Fragment key={row.id}>
                <tr
                  className={
                    row.getIsSelected() ? styles.z_table_row_selected : styles.z_table_row_unselected
                  }
                  onKeyDown={event => {
                    handleRowOnKeyDown(event, row);
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      className={styles.z_table_cell}
                      data-type={cell.column.columnDef.meta?.type.getType() ?? 'text'}
                      key={cell.id}
                      onClick={() => {
                        cellOnClickHandler(row, table, cell);
                      }}
                      {...{
                        style: {
                          width: cell.column.getSize(),
                        },
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        shouldFocus: true,
                        selectedColumnId,
                      })}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && row.getIsSelected() && (
                  <tr
                    className={styles.z_table_subcomponent_tr}
                    onKeyDown={event => {
                      handleRowOnKeyDown(event, row);
                    }}
                  >
                    {}
                    {/* 2nd row is a custom 1 cell row */}
                    <EditableFooterButtons
                      className={styles.z_table_subcomponent_cell}
                      onSave={() => {
                        handleSaveEdit(row);
                      }}
                      onCancel={() => {
                        handleCancelEdit(row);
                      }}
                    />
                  </tr>
                )}
              </Fragment>
            );
          })}
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
    </div>
  );
}
