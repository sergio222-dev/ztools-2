import styles from './EditCategoryForm.module.scss';
import { Input } from '@atoms/Input/Input';
import { ButtonUnfilled } from '@atoms/Button/ButtonUnfilled';
import { ButtonFilled } from '@atoms/Button/ButtonFilled';
import { KeyboardEvent, MouseEvent, SyntheticEvent, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import { Signal, useSignal } from '@preact/signals-react';
import { useOutsideClick } from '@utils/mouseUtils';
import { Typography } from '@atoms/Typography/Typography';
import { EditCategoryVariants } from '@molecules/EditCategoryButton/EditCategoryButton';
import { Row } from '@tanstack/react-table';
import { Category } from '@core/budget/category/domain/Category';
import Modal from 'react-modal';
import { DeleteSubcategoryForm } from '../DeleteSubcategory/DeleteSubcategoryForm';
import { SubCategory } from '@core/budget/category/domain/SubCategory';
import { CategoryDeleteRequest } from '@core/budget/category/domain/CategoryDeleteRequest';

interface EditCategoryFormProperties {
  isOpen: Signal<boolean>;
  variant?: EditCategoryVariants;
  row: Row<Category & SubCategory>;
  updateCategory?: (c: Category) => void;
  updateSubCategory?: (c: SubCategory) => void;
  deleteCategory?: (ids: CategoryDeleteRequest) => void;
  deleteSubCategory?: (ids: CategoryDeleteRequest) => void;
  subCats: SubCategory[];
}

export function EditCategoryForm({
  isOpen,
  variant,
  row,
  updateCategory,
  updateSubCategory,
  deleteCategory,
  deleteSubCategory,
  subCats,
}: EditCategoryFormProperties) {
  // STATE
  const formReference = useRef<HTMLFormElement>(null);
  const tooltipReference = useRef(null);
  const editCategoryFormInput = useRef<HTMLInputElement>(null);
  const modalIsOpen = useSignal('');

  // HANDLERS

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formReference.current === null) return;
    const formData = new FormData(formReference.current);
    const categoryName = formData.get('name') as string;
    if (categoryName === '') return;
    if (updateCategory) {
      variant === 'category' && updateCategory(new Category(row.original.id, categoryName, []));
    }
    if (updateSubCategory) {
      variant === 'subCategory' &&
        updateSubCategory(
          new SubCategory(row.original.id, categoryName, row.original.categoryId, '', '', ''),
        );
    }
    isOpen.value = false;
    return;
  };

  const formCancelHandler = () => {
    isOpen.value = false;
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    modalIsOpen.value = row.original.id;
    isOpen.value = false;
    return;
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const saveButton: HTMLElement | null = document.querySelector('#editCategorySaveButton');
      saveButton?.click();
    }
  };

  // SIDE EFFECTS

  useOutsideClick(tooltipReference, () => {
    isOpen.value = false;
  });

  // useEffect(() => {
  //   editCategoryFormInput.current?.focus();
  // }, [editCategoryFormInput]);

  const focusInputOnOpen = () => {
    if (editCategoryFormInput.current) {
      editCategoryFormInput.current.focus();
    }
  };

  return (
    <div className={styles.edit_category_form_container} ref={tooltipReference}>
      <Tooltip
        anchorSelect={`#edit-category${row.original.id}`}
        clickable
        className={styles.c_tooltip}
        isOpen={isOpen.value}
        afterShow={() => {
          focusInputOnOpen();
        }}
      >
        <form
          name="edit-category"
          className={styles.edit_category_form}
          ref={formReference}
          onSubmit={handleSubmit}
        >
          <Input
            defaultValue={row.getValue('name')}
            className={styles.edit_category_input}
            type="text"
            name="name"
            ref={editCategoryFormInput}
            onKeyDown={event => {
              handleInputKeyDown(event);
            }}
          />
          <div className={styles.form_buttons}>
            <ButtonUnfilled
              variant="delete"
              onClick={event => {
                handleDelete(event);
              }}
            >
              <Typography>Delete</Typography>
            </ButtonUnfilled>
            <div className={styles.cancel_save_buttons}>
              <ButtonUnfilled type="reset" onClick={formCancelHandler} variant="normal">
                {' '}
                Cancel{' '}
              </ButtonUnfilled>
              <ButtonFilled type="submit" className={styles.save_button} id={'editCategorySaveButton'}>
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
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => (modalIsOpen.value = '')}
        >
          <DeleteSubcategoryForm
            modalIsOpen={modalIsOpen}
            id={row.original.id}
            variant={variant}
            deleteCategory={deleteCategory}
            deleteSubCategory={deleteSubCategory}
            subCats={subCats}
          />
        </Modal>
      )}
    </div>
  );
}
