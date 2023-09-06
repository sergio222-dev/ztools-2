import { useSignal } from '@preact/signals-react';
import { TextButton } from '@atoms/Button/TextButton';
import { ButtonHTMLAttributes } from 'react';
import { Typography } from '@atoms/Typography/Typography';
import { EditCategoryForm } from '../../forms/EditCategories/EditCategoryForm';
import { Row } from '@tanstack/react-table';
import { Category } from '@core/budget/category/domain/Category';

export type EditCategoryVariants = 'category' | 'subCategory';
interface EditCategoryButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  row: Row<Category>;
  variant?: EditCategoryVariants;
}

export function EditCategoryButton({ row, variant, children }: EditCategoryButtonProperties) {
  const isOpen = useSignal(false);
  const handleAddCategory = () => {
    isOpen.value = !isOpen.value;
    return;
  };

  return (
    <div>
      <a id={`edit-category${row.original.id}`} onClick={handleAddCategory}>
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
      <EditCategoryForm isOpen={isOpen} variant={variant} row={row} />
    </div>
  );
}

EditCategoryButton.defaultProps = {
  variant: 'category',
};
