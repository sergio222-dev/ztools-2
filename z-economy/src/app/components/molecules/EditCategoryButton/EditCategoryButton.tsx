import { useSignal } from '@preact/signals-react';
import { TextButton } from '@atoms/Button/TextButton';
import { ButtonHTMLAttributes } from 'react';
import { Typography } from '@atoms/Typography/Typography';
import { Row } from '@tanstack/react-table';
import { Category } from '@core/budget/category/domain/Category';
import { SubCategory } from '@core/budget/category/domain/SubCategory';
// eslint-disable-next-line import/namespace
import { EditCategoryForm } from '../../forms/EditCategories/EditCategoryForm';
import { CategoryDeleteRequest } from '@core/budget/category/domain/CategoryDeleteRequest';

export type EditCategoryVariants = 'category' | 'subCategory';
interface EditCategoryButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  row: Row<Category & SubCategory>;
  variant?: EditCategoryVariants;
  updateCategory?: (c: Category) => void;
  updateSubCategory?: (c: SubCategory) => void;
  deleteCategory?: (ids: CategoryDeleteRequest) => void;
  deleteSubCategory?: (ids: CategoryDeleteRequest) => void;
  subCats: SubCategory[];
}

export function EditCategoryButton({
  row,
  variant,
  children,
  updateCategory,
  updateSubCategory,
  deleteCategory,
  deleteSubCategory,
  subCats,
}: EditCategoryButtonProperties) {
  const isOpen = useSignal(false);
  const handleEditCategory = () => {
    isOpen.value = !isOpen.value;
    return;
  };

  return (
    <div>
      <a id={`edit-category${row.original.id}`} onClick={handleEditCategory}>
        {variant === 'subCategory' ? (
          <TextButton variant="underline">
            <Typography size="large" variant="normal">
              {children && children}
            </Typography>
          </TextButton>
        ) : (
          <TextButton variant="normal">
            <Typography size="large" variant="bold">
              {children && children}
            </Typography>
          </TextButton>
        )}
      </a>
      <EditCategoryForm
        isOpen={isOpen}
        variant={variant}
        row={row}
        updateCategory={updateCategory}
        updateSubCategory={updateSubCategory}
        deleteCategory={deleteCategory}
        deleteSubCategory={deleteSubCategory}
        subCats={subCats}
      />
    </div>
  );
}

EditCategoryButton.defaultProps = {
  variant: 'category',
};
