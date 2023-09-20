import styles from './EditCategoryForm.module.scss';
import { Input } from '@atoms/Input/Input';
import { ButtonUnfilled } from '@atoms/Button/ButtonUnfilled';
import { ButtonFilled } from '@atoms/Button/ButtonFilled';
// eslint-disable-next-line import/default
import React, { useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import { Signal, useSignal } from '@preact/signals-react';
import { useOutsideClick } from '@utils/mouseUtils';
import { Button } from '@atoms/Button/Button';
import { Typography } from '@atoms/Typography/Typography';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';
import { EditCategoryVariants } from '@molecules/EditCategoryButton/EditCategoryButton';
import { Row } from '@tanstack/react-table';
import { Category } from '@core/budget/category/domain/Category';
import Modal from 'react-modal';
import { DeleteSubcategoryForm } from '../DeleteSubcategory/DeleteSubcategoryForm';

interface EditCategoryFormProperties {
  isOpen: Signal<boolean>;
  variant?: EditCategoryVariants;
  row: Row<Category>;
}

export function EditCategoryForm({ isOpen, variant, row }: EditCategoryFormProperties) {
  // STATE
  const formReference = useRef(null);
  const tooltipReference = useRef(null);
  const modalIsOpen = useSignal(false);

  // SERVICES
  const { deleteSubCategory, deleteCategory } = useCategoryHook(new Date());

  // HANDLERS

  const formCancelHandler = () => {
    isOpen.value = false;
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    isOpen.value = false;
    modalIsOpen.value = true;
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
          <Input
            defaultValue={row.getValue('name')}
            className={styles.edit_category_input}
            type="text"
            name="categoryName"
          />
          <div className={styles.form_buttons}>
            <Button
              variant="primary"
              onClick={event => {
                handleDelete(event, row.original.id);
              }}
              className={styles.edit_category_delete_button}
            >
              <Typography>Delete</Typography>
            </Button>
            <div className={styles.cancel_save_buttons}>
              <ButtonUnfilled type="reset" onClick={formCancelHandler}>
                {' '}
                Cancel{' '}
              </ButtonUnfilled>
              <ButtonFilled type="submit" className={styles.save_button}>
                {' '}
                Save{' '}
              </ButtonFilled>
            </div>
          </div>
        </form>
      </Tooltip>
      <Modal
        // isOpen={modalIsOpen.value}
        isOpen={true}
        className={styles.delete_subcategory_modal_content}
        overlayClassName={styles.delete_subcategory_modal_overlay}
      >
        <DeleteSubcategoryForm isOpen={modalIsOpen} id={''} variant={variant} />
      </Modal>
    </div>
  );
}
