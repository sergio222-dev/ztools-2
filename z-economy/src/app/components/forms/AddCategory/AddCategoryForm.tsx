import styles from './AddCategoryForm.module.scss';
import { Input } from '@atoms/Input/Input';
import { CancelButton } from '@atoms/Button/CancelButton';
import { SaveButton } from '@atoms/Button/SaveButton';
import { SyntheticEvent, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import { Signal } from '@preact/signals-react';
import { useOutsideClick } from '@utils/mouseUtils';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '@core/budget/category/domain/Category';
import { SubCategory } from '@core/budget/category/domain/SubCategory';

interface AddCategoryFormProperties {
  isOpen: Signal<boolean>;
  createCategoryGroup?: (c: Category) => Promise<void>;
  createSubCategory?: (c: SubCategory) => Promise<void>;
  variant?: 'subCategory';
  categoryId?: string;
}

export function AddCategoryForm({
  isOpen,
  createCategoryGroup,
  createSubCategory,
  variant,
  categoryId,
}: AddCategoryFormProperties) {
  const formReference = useRef(null);
  const tooltipReference = useRef(null);

  const categoryGroupSubmitHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    isOpen.value = false;
    if (formReference.current === null) return;
    const createCategoryGroupForm = new FormData(formReference.current);
    const newCategoryGroupName = createCategoryGroupForm.get('categoryName') as string;
    if (newCategoryGroupName === '') return;
    if (createCategoryGroup) {
      void createCategoryGroup({
        id: uuidv4(),
        name: newCategoryGroupName,
        subCategories: [],
      });
    }
  };

  const categorySubmitHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    isOpen.value = false;
    if (formReference.current === null) return;
    const createCategoryForm = new FormData(formReference.current);
    const newCategoryName = createCategoryForm.get('categoryName') as string;
    if (newCategoryName === '') return;
    if (createSubCategory && categoryId) {
      void createSubCategory({
        id: uuidv4(),
        name: newCategoryName,
        categoryId: categoryId,
        assignedBudget: '',
        activity: '',
        available: '',
      });
    }
  };

  const formCancelHandler = () => {
    isOpen.value = false;
  };

  useOutsideClick(tooltipReference, () => {
    isOpen.value = false;
  });

  return variant === 'subCategory' ? (
    <div className={styles.add_category_form_container} ref={tooltipReference}>
      <Tooltip
        anchorSelect={`#add-category${categoryId}`}
        clickable
        className={styles.c_tooltip}
        isOpen={isOpen.value}
      >
        <form
          name="add-category"
          className={styles.add_category_form}
          ref={formReference}
          onSubmit={categorySubmitHandler}
        >
          <Input placeholder="New Category" type="text" name="categoryName" />
          <div className={styles.form_buttons}>
            <CancelButton type="reset" onClick={formCancelHandler} />
            <SaveButton type="submit" />
          </div>
        </form>
      </Tooltip>
    </div>
  ) : (
    <div className={styles.add_category_form_container} ref={tooltipReference}>
      <Tooltip anchorSelect="#add-category" clickable className={styles.c_tooltip} isOpen={isOpen.value}>
        <form
          name="add-category"
          className={styles.add_category_form}
          ref={formReference}
          onSubmit={categoryGroupSubmitHandler}
        >
          <Input placeholder="New Category Group" type="text" name="categoryName" />
          <div className={styles.form_buttons}>
            <CancelButton type="reset" onClick={formCancelHandler} />
            <SaveButton type="submit" />
          </div>
        </form>
      </Tooltip>
    </div>
  );
}
