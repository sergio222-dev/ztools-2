import { Cell, ColumnDef, createColumnHelper, Row, Table } from '@tanstack/react-table';
import { AddCategoryButton, IndeterminateCheckbox } from '@molecules/index';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import { Typography } from '@atoms/Typography/Typography';
import { NumericTextType, OtherTextType } from '@utils/table/types';
import { Button } from '@atoms/Button/Button';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';
import styles from './renders/CategoryTable.module.scss';
import cls from 'classnames';
import { EditableCell } from '@molecules/EditableCell/EditableCell';
import { SubCategoryBudget } from '@core/budget/category/domain/SubCategoryBudget';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { useOutsideClick } from '@utils/mouseUtils';
import { Category } from '@core/budget/category/domain/Category';
import currency from 'currency.js';
import { SubCategory } from '@core/budget/category/domain/SubCategory';

export type A = Category & SubCategory;

export function useCategoryTableHook(budgetDate: Date) {
  // MODEL

  // STATE
  const editedAssignValue = useRef('');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line unicorn/no-useless-undefined
  const reference = useRef<HTMLDivElement>(undefined);
  const tableReference = useRef<Table<Category>>();

  // SERVICES
  const { cdata, createCategoryGroup, createSubCategory, assignSubCategoryBudget, mutate } =
    useCategoryHook(budgetDate);

  useEffect(() => {
    void mutate(cdata, { revalidate: true });
  }, [budgetDate]);
  // HANDLERS

  const handleOnEdit = (
    row: Row<Category>,
    table: Table<Category>,
    cell: Cell<Category, string>,
    // eslint-disable-next-line unicorn/consistent-function-scoping
  ) => {
    if (row.subRows.length === 0) {
      row.toggleSelected(true);
    }
  };
  const handleAssignOnBlur = async (subCategoryId: string, row: Row<Category>) => {
    const b: SubCategoryBudget = {
      amount: editedAssignValue.current,
      month: String(budgetDate.getMonth() + 1).padStart(2, '0'),
      year: String(budgetDate.getFullYear()),
      subCategoryId: subCategoryId,
    };

    if (b.amount !== '') {
      void assignSubCategoryBudget(b);
      editedAssignValue.current = '';
      row.toggleSelected(false);
      return;
    }
  };

  const handleRowOnKeyDown = (event: KeyboardEvent, row: Row<Category>) => {
    if (event.key === 'Escape' || event.key === 'Enter') {
      row.toggleSelected(false);
      console.log(row.getValue('assigned'));
    }
  };

  // SIDE EFFECTS

  useOutsideClick(reference, () => {
    if (tableReference.current && tableReference.current?.getIsSomeRowsSelected()) {
      tableReference.current?.toggleAllRowsSelected(false);
    }
  });

  const totalCategoryData = (id: string, key: keyof SubCategory) => {
    // eslint-disable-next-line unicorn/prefer-array-find
    const category = cdata.find(category => category.id === id);
    return (
      category?.subCategories
        // eslint-disable-next-line unicorn/no-array-reduce
        .reduce((a, subCategory) => {
          return currency(a).add(subCategory[key]);
        }, currency(0))
        .format()
    );
  };

  const columns: ColumnDef<Category, any>[] = [
    {
      id: 'checkbox',
      accessorKey: 'checkbox',
      header: ({ table }) => (
        <div className="z_flex z_flex_jc_center">
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        </div>
      ),
      size: 30,
      maxSize: 30,
      minSize: 30,
      cell: ({ row }) => (
        <div className="z_flex z_flex_jc_center">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
      meta: {
        type: new OtherTextType(),
      },
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ table }) => (
        <div className="z_flex z_flex_jc_left z_flex_ai_center">
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
            <div className="z_flex_inline z_flex_ai_center">
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
        </div>
      ),
    },
    {
      id: 'assigned',
      accessorKey: 'assignedBudget',
      header: () => <Typography size="small">ASSIGNED</Typography>,
      cell: info => {
        return info.row.getIsSelected() &&
          !info.row.original.subCategories &&
          info.table.getSelectedRowModel().rows.length === 0 ? (
          <EditableCell
            isEditable={true}
            onBlur={() => {
              handleAssignOnBlur(info.row.original.id, info.row);
            }}
            type={new NumericTextType().getType()}
            defaultValue={info.getValue()}
            onChangeValue={value => {
              editedAssignValue.current = value;
            }}
            shouldFocus={true}
            style={{ width: '50%' }}
          />
        ) : (
          <EditableCell
            isEditable={false}
            type={new NumericTextType().getType()}
            defaultValue={
              info.row.original.subCategories
                ? totalCategoryData(info.row.original.id, 'assignedBudget')
                : info.getValue()
            }
          />
        );
      },
      meta: {
        type: new NumericTextType(),
      },
    },
    {
      id: 'activity',
      accessorKey: 'activity',
      header: () => <Typography size="small">ACTIVITY</Typography>,
      cell: info => (
        <EditableCell
          isEditable={false}
          type={new NumericTextType().getType()}
          defaultValue={
            info.row.original.subCategories
              ? totalCategoryData(info.row.original.id, 'activity')
              : info.getValue()
          }
        />
      ),
      meta: {
        type: new NumericTextType(),
      },
    },
    {
      id: 'available',
      accessorKey: 'available',
      header: () => <Typography size="small">ACTIVITY</Typography>,
      cell: info => (
        <EditableCell
          isEditable={false}
          type={new NumericTextType().getType()}
          defaultValue={
            info.row.original.subCategories
              ? totalCategoryData(info.row.original.id, 'available')
              : info.getValue()
          }
        />
      ),
      meta: {
        type: new NumericTextType(),
      },
    },
  ];

  return { cdata, columns, createCategoryGroup, handleOnEdit, reference, tableReference, handleRowOnKeyDown };
}
