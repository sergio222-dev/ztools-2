import { useMemo } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IndeterminateCheckbox } from '@molecules/index';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import { Typography } from '@atoms/Typography/Typography';
import { NumericTextType } from '@utils/table/types';
import { Button } from '@atoms/Button/Button';

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

export function useBudgetPageHooks(): [CategoryTableModel, object] {
  // MODEL
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
          <Button
            variant="icon"
            onClick={table.getToggleAllRowsExpandedHandler()}
            StartIcon={table.getIsAllRowsExpanded() ? <AiFillCaretDown /> : <AiFillCaretRight />}
          ></Button>
          <div className="z_flex z_flex_ai_center">
            <Typography size="small" Component="span">
              CATEGORY
            </Typography>
          </div>
        </div>
      ),
      cell: ({ row, getValue }) => (
        <div className="z_flex z_flex_jc_left z_flex_ai_center">
          <>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
            {row.getCanExpand() && (
              <Button
                onClick={row.getToggleExpandedHandler()}
                variant="icon"
                StartIcon={row.getIsExpanded() ? <AiFillCaretDown /> : <AiFillCaretRight />}
              />
            )}
            {row.getCanExpand() ? (
              <Typography size="large" variant="bold">
                {getValue()}
              </Typography>
            ) : (
              <div className="z_padding_left_4">
                <Typography size="large">{getValue()}</Typography>
              </div>
            )}
          </>
        </div>
      ),
      // footer: props => props.column.id,
    },
    columnHelper.accessor('assigned', {
      id: 'assigned',
      header: () => <Typography size="small">ASSIGNED</Typography>,
      cell: info => info.getValue(),
      meta: {
        type: new NumericTextType(),
      },
    }),
    columnHelper.accessor('activity', {
      id: 'activity',
      header: () => <Typography size="small">ACTIVITY</Typography>,
      cell: info => info.getValue(),
      meta: {
        type: new NumericTextType(),
      },
    }),
    columnHelper.accessor('available', {
      id: 'available',
      header: () => <Typography size="small">AVAILABLE</Typography>,
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
