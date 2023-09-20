import styles from './DeleteSubcategoryForm.module.scss';
import { SyntheticEvent, useRef } from 'react';
import cls from 'classnames';
import { Typography } from '@atoms/Typography/Typography';
import { IconButton } from '@atoms/Button/IconButton';
import { RxCross2 } from 'react-icons/rx';
import { Signal } from '@preact/signals-react';
import { Select } from '@atoms/Select/Select';
import { ButtonUnfilled } from '@atoms/Button/ButtonUnfilled';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';
import { EditCategoryVariants } from '@molecules/EditCategoryButton/EditCategoryButton';
import { CategoryDeleteRequest } from '@core/budget/category/domain/CategoryDeleteRequest';

interface DeleteSubcategoryFormProperties {
  isOpen: Signal<boolean>;
  id: string;
  variant?: EditCategoryVariants;
}
export function DeleteSubcategoryForm({ isOpen, id, variant }: DeleteSubcategoryFormProperties) {
  // STATE
  const formReference = useRef<HTMLFormElement>(null);

  // SERVICES
  const { subCats, deleteSubCategory, deleteCategory } = useCategoryHook(new Date());

  // HANDLERS
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formReference.current === null) return;
    const formData = new FormData(formReference.current);
    const subCategoryId = formData.get('selectCategory') as string;
    variant === 'category' && void deleteCategory(new CategoryDeleteRequest(id, subCategoryId));
    variant === 'subCategory' && void deleteSubCategory(new CategoryDeleteRequest(id, subCategoryId));
    isOpen.value = false;
  };

  const filteredSubcats = subCats.filter(subCat =>
    variant === 'category'
      ? subCat.categoryId !== id && subCat.name !== 'Inflow: Ready to Assign'
      : subCat.name !== 'Inflow: Ready to Assign',
  );

  return (
    <form name="delete-subcategory" ref={formReference} onSubmit={handleSubmit}>
      <div className={cls(styles.delete_subcategory_modal_title)}>
        <div className={styles.title_text}>
          <Typography variant="bold" Component="h1" size="large">
            Delete Category
          </Typography>
        </div>
        <IconButton
          type="reset"
          onClick={() => (isOpen.value = false)}
          className={styles.delete_subcategory_modal_cancel_button}
        >
          <RxCross2 />
        </IconButton>
      </div>
      <div className={styles.delete_subcategory_modal_form_body}>
        <div className={styles.disclaimer_text}>
          <Typography Component="span" variant="normal" size="normal">
            Before you can delete the category
            <strong> Health & Wellness</strong>, you&apos;ll need to reassign your past activity to a new
            category.
          </Typography>
        </div>
        <div>
          <label>
            <div className={styles.select_text}>
              <Typography Component="p" variant="bold" size="normal">
                Select category
              </Typography>
            </div>
          </label>
          <Select id="selectCategory" name="selectCategory" className={styles.select_subcategory}>
            {filteredSubcats?.map(subCategory => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
          </Select>
          <div>
            <Typography variant="bold" size="large">
              Here&apos;s what will be reassigned to the new category:
            </Typography>
          </div>
          <ul>
            <li>All transactions</li>
            <li>All assigned amounts</li>
            <li>Any remaining available amount</li>
          </ul>
        </div>
        <div className={styles.delete_subcategory_form_footer_buttons}>
          <ButtonUnfilled type="reset" onClick={() => (isOpen.value = false)}>
            Cancel
          </ButtonUnfilled>
          <ButtonUnfilled type="submit" className={styles.delete_subcategory_form_footer_delete_button}>
            Delete
          </ButtonUnfilled>
        </div>
      </div>
    </form>
  );
}
