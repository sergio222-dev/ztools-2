import styles from './AddCategory.module.scss';
import { Input } from '@atoms/Input/Input';
import { CancelButton } from '@atoms/Button/CancelButton';
import { SaveButton } from '@atoms/Button/SaveButton';
import { SyntheticEvent, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import { Signal } from '@preact/signals-react';
import { useOutsideClick } from '@utils/mouseUtils';

interface AddCategoryFormProperties {
  isOpen: Signal<boolean>;
}

export function AddCategoryForm({ isOpen }: AddCategoryFormProperties) {
  const formReference = useRef(null);
  const tooltipReference = useRef(null);

  const formSubmitHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    isOpen.value = false;
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
          <Input placeholder="New Category Group" type="text" />
          <div className={styles.form_buttons}>
            <CancelButton type="reset" onClick={formCancelHandler} />
            <SaveButton type="submit" />
          </div>
        </form>
      </Tooltip>
    </div>
  );
}
