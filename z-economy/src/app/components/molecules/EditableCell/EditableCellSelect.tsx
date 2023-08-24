import { HTMLAttributes } from 'react';
import currency from 'currency.js';
import { useEditableCellHook } from '@molecules/EditableCell/useEditableCell.hook';
import { Select } from '@atoms/Select/Select';
import { SubCategory } from '@core/budget/category/domain/SubCategory';

type T = SubCategory[];

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
      <Select ref={inputReference} onChange={handleOnChange} defaultValue={value} onBlur={handleOnBlur}>
        {options?.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Select>
    </div>
  ) : (
    <div>
      {type === 'numeric' ? currency(defaultValue as string, { separator: ',' }).format() : defaultValue}
    </div>
  );
}
