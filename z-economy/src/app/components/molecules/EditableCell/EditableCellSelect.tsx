import { HTMLAttributes } from 'react';
import currency from 'currency.js';
import { useEditableCellHook } from '@molecules/EditableCell/useEditableCell.hook';
import { Select } from '@atoms/Select/Select';
import styles from '@molecules/EditableCell/EditableCell.module.scss';
import { Account } from '@core/budget/account/domain/Account';
import { Category } from '@core/budget/category/domain/Category';

type T = Category[] | Account[];

interface EditableCellCategoryProperties extends HTMLAttributes<HTMLSelectElement> {
  isEditable: boolean;
  onChangeValue?: (value: string) => void;
  type?: string;
  shouldFocus?: boolean;
  options?: T;
}

export function EditableCellSelect(properties: EditableCellCategoryProperties) {
  const { defaultValue, shouldFocus, onBlur, isEditable, type, onChangeValue, options } = properties;
  const { models, operators } = useEditableCellHook<HTMLSelectElement>({
    defaultValue,
    shouldFocus,
    onBlur,
    onChangeValue,
  });

  const { inputReference, value } = models;
  const { handleOnChange, handleOnBlur } = operators;

  return isEditable ? (
    <div>
      <Select
        ref={inputReference}
        onChange={handleOnChange}
        defaultValue={value}
        onBlur={handleOnBlur}
        className={styles.z_input_text}
      >
        {options?.map(option =>
          'subCategories' in option ? (
            option.subCategories.map(subCategory => (
              <option key={subCategory.id} value={subCategory.id}>
                {option.name + ': ' + subCategory.name}
              </option>
            ))
          ) : (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ),
        )}
      </Select>
    </div>
  ) : (
    <div>
      {type === 'numeric' ? currency(defaultValue as string, { separator: ',' }).format() : defaultValue}
    </div>
  );
}
