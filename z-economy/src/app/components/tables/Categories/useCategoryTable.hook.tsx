import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IndeterminateCheckbox } from '@molecules/index';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import { Typography } from '@atoms/Typography/Typography';
import { NumericTextType } from '@utils/table/types';
import { Button } from '@atoms/Button/Button';
import { useCategoryHook } from '@core/budget/budget/application/adapter/useCategory.hook';

export type TableCategory = {
  id: string;
  name: string;
  assignedBudget: string;
  activity: string;
  available: string;
  subCategories?: subCategories[];
};

export type subCategories = {
  id: string;
  name: string;
  assignedBudget: string;
  activity: string;
  available: string;
  subCategories?: subCategories[];
};

// interface CategoryTableModel {
//   data: TableCategory[];
//   columns: ColumnDef<TableCategory, any>[];
//   newCategoryGroup: (c: Category) => void;
// }

export function useCategoryTableHook() {
  // MODEL
  const { data, createCategoryGroup } = useCategoryHook();
  const columnHelper = createColumnHelper<TableCategory>();

  const columns: ColumnDef<TableCategory, any>[] = [
    {
      accessorKey: 'name',
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
            {row.original.subCategories && (
              <Button
                onClick={row.getToggleExpandedHandler()}
                variant="icon"
                StartIcon={row.getIsExpanded() ? <AiFillCaretDown /> : <AiFillCaretRight />}
                style={{ opacity: row.original.subCategories.length === 0 ? '0' : '1' }}
              />
            )}
            {row.original.subCategories ? (
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
    columnHelper.accessor('assignedBudget', {
      id: 'assigned',
      header: () => <Typography size="small">ASSIGNED</Typography>,
      cell: info => (info.getValue() === undefined ? '0' : info.getValue()),
      meta: {
        type: new NumericTextType(),
      },
    }),
    columnHelper.accessor('activity', {
      id: 'activity',
      header: () => <Typography size="small">ACTIVITY</Typography>,
      cell: info => (info.getValue() === undefined ? '23424' : info.getValue()),
      meta: {
        type: new NumericTextType(),
      },
    }),
    columnHelper.accessor('available', {
      id: 'available',
      header: () => <Typography size="small">AVAILABLE</Typography>,
      cell: info => (info.getValue() === undefined ? '123123' : info.getValue()),
      meta: {
        type: new NumericTextType(),
      },
    }),
  ];

  return { data, columns, createCategoryGroup };
}
