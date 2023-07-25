import styles from './AddCategoryForm.module.scss';
import { Input } from '@atoms/Input/Input';
import { CancelButton } from '@atoms/Button/CancelButton';
import { SaveButton } from '@atoms/Button/SaveButton';
import { SyntheticEvent, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import { Signal } from '@preact/signals-react';
import { useOutsideClick } from '@utils/mouseUtils';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '@core/budget/budget/domain/Category';

interface AddCategoryFormProperties {
  isOpen: Signal<boolean>;
  createCategoryGroup: (c: Category) => Promise<void>;
}

export function AddCategoryForm({ isOpen, createCategoryGroup }: AddCategoryFormProperties) {
  const formReference = useRef(null);
  const tooltipReference = useRef(null);

  const formSubmitHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    isOpen.value = false;
    if (formReference.current === null) return;
    const createCategoryGroupForm = new FormData(formReference.current);
    const newCategoryGroupName = createCategoryGroupForm.get('categoryName') as string;
    if (newCategoryGroupName === '') return;
    createCategoryGroup({
      id: uuidv4(),
      name: newCategoryGroupName,
    });
  };

  const formCancelHandler = () => {
    isOpen.value = false;
  };

  useOutsideClick(tooltipReference, () => {
    isOpen.value = false;
  });

  return (
    <div className={styles.add_category_form_container} ref={tooltipReference}>
      <Tooltip anchorSelect="#add-category" clickable className={styles.c_tooltip} isOpen={isOpen.value}>
        <form
          name="add-category"
          className={styles.add_category_form}
          ref={formReference}
          onSubmit={formSubmitHandler}
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
