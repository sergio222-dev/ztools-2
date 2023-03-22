import { useMemo } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IndeterminateCheckbox } from '@molecules/TransactionTable/TableFunctions';
import styles from './BudgetPage.module.scss';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import { Typography } from '@atoms/Typography/Typography';
import { NumericTextType } from '@utils/table/types';

export type Category = {
  category: string;
  assigned: string;
  activity: string;
  available: string;
  subRows?: SubRowData[];
};

export type SubRowData = {
  category: string;
  assigned: string;
  activity: string;
  available: string;
  subRows?: SubRowData[];
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

interface CategoryTableModel {
  columns: ColumnDef<Category, any>[];
  data: Category[];
}

export function useBudgetPagePresenter(): [CategoryTableModel, object] {
  const originalData = makeData(5, 3);
  const data = useMemo(() => originalData, []);
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
              className: styles.category_expand_button_header,
            }}
          >
            {table.getIsAllRowsExpanded() ? <AiFillCaretDown /> : <AiFillCaretRight />}
          </button>
          <div className="z_flex z_flex_ai_center">
            <Typography size="small" Component="span">
              CATEGORY
            </Typography>
          </div>
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
                  className: styles.category_expand_button_row,
                }}
              >
                {row.getIsExpanded() ? <AiFillCaretDown /> : <AiFillCaretRight />}
              </button>
            )}
            <div
              className={row.getCanExpand() ? styles.z_table_expansible_row_name : styles.z_table_cell_text}
            >
              <Typography size="large" Component="span">
                {getValue()}
              </Typography>
            </div>
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

  return [
    {
      columns,
      data,
    },
    {},
  ];
}
