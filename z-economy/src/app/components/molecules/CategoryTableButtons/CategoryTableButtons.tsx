import { UtilityButton } from '@atoms/Button/UtilityButton';
import { AiFillPlusCircle } from 'react-icons/ai';
import styles from './CategoryTableButtons.module.scss';
import { Typography } from '@atoms/Typography/Typography';
import { AddCategoryForm } from '../../forms/AddCategory/AddCategoryForm';
import { useSignal } from '@preact/signals-react';
import { Category } from '@core/budget/category/domain/Category';

interface CategoryTableButtonsProperties {
  createCategoryGroup: (c: Category) => Promise<void>;
}

export function CategoryTableButtons({ createCategoryGroup }: CategoryTableButtonsProperties) {
  const isOpen = useSignal(false);
  const handleAddCategory = () => {
    isOpen.value = !isOpen.value;
    return;
  };

  return (
    <div className={styles.c_table_buttons_main_div}>
      <a id="add-category" onClick={handleAddCategory}>
        <UtilityButton StartIcon={<AiFillPlusCircle />} variant={'icon'}>
          <Typography>Category Group</Typography>
        </UtilityButton>
      </a>
      <AddCategoryForm isOpen={isOpen} createCategoryGroup={createCategoryGroup} />
    </div>
  );
}
