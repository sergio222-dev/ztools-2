import styles from './EditCategoryForm.module.scss';
import { Input } from '@atoms/Input/Input';
import { ButtonUnfilled } from '@atoms/Button/ButtonUnfilled';
import { ButtonFilled } from '@atoms/Button/ButtonFilled';
import { MouseEvent, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import { Signal, useSignal } from '@preact/signals-react';
import { useOutsideClick } from '@utils/mouseUtils';
import { Typography } from '@atoms/Typography/Typography';
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
  const formReference = useRef<HTMLFormElement>(null);
  const tooltipReference = useRef(null);
  const modalIsOpen = useSignal('');

  // HANDLERS

  const formCancelHandler = () => {
    isOpen.value = false;
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    modalIsOpen.value = row.original.id;
    isOpen.value = false;
    return;
  };

  // SIDE EFFECTS

  useOutsideClick(tooltipReference, () => {
    isOpen.value = false;
  });

  // console.log(modalIsOpen.value, 'mounting');

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
            <ButtonUnfilled
              variant="delete"
              // type="reset"
              onClick={event => {
                handleDelete(event);
              }}
              // className={styles.edit_category_delete_button}
            >
              <Typography>Delete</Typography>
            </ButtonUnfilled>
            <div className={styles.cancel_save_buttons}>
              <ButtonUnfilled type="reset" onClick={formCancelHandler} variant="normal">
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
      {modalIsOpen.value === row.original.id && (
        <Modal
          key={row.original.id}
          isOpen={modalIsOpen.value === row.original.id}
          className={styles.delete_subcategory_modal_content}
          overlayClassName={styles.delete_subcategory_modal_overlay}
          shouldCloseOnEsc={true}
          onRequestClose={() => (modalIsOpen.value = '')}
        >
          <DeleteSubcategoryForm modalIsOpen={modalIsOpen} id={row.original.id} variant={variant} />
        </Modal>
      )}
    </div>
  );
}
