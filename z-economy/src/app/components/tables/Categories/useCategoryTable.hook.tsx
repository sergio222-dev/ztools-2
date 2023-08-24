import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { AddCategoryButton, IndeterminateCheckbox } from '@molecules/index';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import { Typography } from '@atoms/Typography/Typography';
import { NumericTextType } from '@utils/table/types';
import { Button } from '@atoms/Button/Button';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';
import styles from './renders/CategoryTable.module.scss';
import cls from 'classnames';
import { EditableCell } from '@molecules/EditableCell/EditableCell';

export type TableCategory = {
  id: string;
  name: string;
  assignedBudget?: string;
  activity?: string;
  available?: string;
  subCategories?: subCategories[];
};

export type subCategories = {
  id: string;
  name: string;
  assignedBudget: string;
  activity: string;
  available: string;
};

// interface CategoryTableModel {
//   data: TableCategory[];
//   columns: ColumnDef<TableCategory, any>[];
//   newCategoryGroup: (c: Category) => void;
// }

export function useCategoryTableHook() {
  // MODEL
  const { cdata, createCategoryGroup, createSubCategory } = useCategoryHook();
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
        <div className={cls('z_flex z_flex_jc_left z_flex_ai_center')}>
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
                style={{
                  opacity: row.original.subCategories.length === 0 ? '0' : '1',
                  cursor: row.original.subCategories.length === 0 ? 'default' : 'pointer',
                }}
              />
            )}
            {row.original.subCategories ? (
              <div className="z_flex_inline">
                <Typography size="large" variant="bold">
                  {getValue()}
                </Typography>
                <div className={styles.c_table_add_button}>
                  <AddCategoryButton createSubCategory={createSubCategory} categoryId={row.original.id} />
                </div>
              </div>
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
      cell: info => {
        return info.row.getIsSelected() &&
          !info.row.original.subCategories &&
          info.table.getSelectedRowModel().rows.length === 0 ? (
          <EditableCell isEditable={true} />
        ) : (
          '111111'
        );
      },
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
      cell: info => (info.getValue() === undefined ? '123123' : info.getValue()),
      meta: {
        type: new NumericTextType(),
      },
    }),
  ];

  return { cdata, columns, createCategoryGroup };
}
