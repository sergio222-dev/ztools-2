import { useSignal } from '@preact/signals-react';
import { UtilityButton } from '@atoms/Button/UtilityButton';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AddCategoryForm } from '../../forms/AddCategory/AddCategoryForm';
import { SubCategory } from '@core/budget/category/domain/SubCategory';

interface CategoryTableButtonsProperties {
  createSubCategory: (c: SubCategory) => Promise<void>;
  categoryId: string;
}

export function AddCategoryButton({ createSubCategory, categoryId }: CategoryTableButtonsProperties) {
  const isOpen = useSignal(false);
  const handleAddCategory = () => {
    isOpen.value = !isOpen.value;
    return;
  };

  // console.log(categoryId);

  return (
    <div>
      <a id="add-category" onClick={handleAddCategory} title="Add Category">
        <UtilityButton StartIcon={<AiFillPlusCircle />} variant={'icon'}></UtilityButton>
      </a>
      <AddCategoryForm
        isOpen={isOpen}
        createSubCategory={createSubCategory}
        variant={'subCategory'}
        categoryId={categoryId}
      />
    </div>
  );
}
