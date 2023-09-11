import styles from './EditCategoryForm.module.scss';
import { Input } from '@atoms/Input/Input';
import { ButtonUnfilled } from '@atoms/Button/ButtonUnfilled';
import { ButtonFilled } from '@atoms/Button/ButtonFilled';
// eslint-disable-next-line import/default
import React, { useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import { Signal } from '@preact/signals-react';
import { useOutsideClick } from '@utils/mouseUtils';
import { Button } from '@atoms/Button/Button';
import { Typography } from '@atoms/Typography/Typography';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';
import { EditCategoryVariants } from '@molecules/EditCategoryButton/EditCategoryButton';
import { Row } from '@tanstack/react-table';
import { Category } from '@core/budget/category/domain/Category';

interface EditCategoryFormProperties {
  isOpen: Signal<boolean>;
  variant?: EditCategoryVariants;
  row: Row<Category>;
}

export function EditCategoryForm({ isOpen, variant, row }: EditCategoryFormProperties) {
  // STATE
  const formReference = useRef(null);
  const tooltipReference = useRef(null);

  // SERVICES
  const { deleteSubCategory, deleteCategory } = useCategoryHook(new Date());

  // HANDLERS

  const formCancelHandler = () => {
    isOpen.value = false;
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    variant === 'category' && void deleteCategory(id);
    variant === 'subCategory' && void deleteSubCategory(id);
    isOpen.value = false;
    return;
  };

  // SIDE EFFECTS

  useOutsideClick(tooltipReference, () => {
    isOpen.value = false;
  });

  return (
    <div className={styles.edit_category_form_container} ref={tooltipReference}>
      <Tooltip
        anchorSelect={`#edit-category${row.original.id}`}
        clickable
        className={styles.c_tooltip}
        isOpen={isOpen.value}
      >
        <form name="edit-category" className={styles.edit_category_form} ref={formReference}>
          <Input defaultValue={row.getValue('name')} type="text" name="categoryName" />
          <div className={styles.form_buttons}>
            <Button
              variant="primary"
              onClick={event => {
                handleDelete(event, row.original.id);
              }}
              style={{ backgroundColor: 'indianred' }}
            >
              <Typography>Delete</Typography>
            </Button>
            <ButtonUnfilled type="reset" onClick={formCancelHandler}>
              {' '}
              Cancel{' '}
            </ButtonUnfilled>
            <ButtonFilled type="submit"> Save </ButtonFilled>
          </div>
        </form>
      </Tooltip>
    </div>
  );
}
