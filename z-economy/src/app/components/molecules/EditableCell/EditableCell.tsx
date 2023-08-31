import { HTMLAttributes } from 'react';
import { Input } from '@atoms/Input/Input';
import styles from '@molecules/EditableCell/EditableCell.module.scss';
import currency from 'currency.js';
import { useEditableCellHook } from '@molecules/EditableCell/useEditableCell.hook';

interface EditableCellProperties extends HTMLAttributes<HTMLInputElement> {
  isEditable: boolean;
  onChangeValue?: (value: string) => void;
  type?: string;
  shouldFocus?: boolean;
}

export function EditableCell(properties: EditableCellProperties) {
  const { defaultValue, shouldFocus, onBlur, isEditable, type, onChangeValue } = properties;

  const { models, operators } = useEditableCellHook<HTMLInputElement>({
    defaultValue,
    onBlur,
    onChangeValue,
    shouldFocus,
  });

  const { inputReference, value } = models;
  const { handleOnBlur, handleOnChange, handleOnChangeNumeric, handleOnKeyDown } = operators;

  return isEditable ? (
    <div>
      <Input
        ref={inputReference}
        onChange={type === 'numeric' ? handleOnChangeNumeric : handleOnChange}
        onBlur={handleOnBlur}
        defaultValue={value}
        className={type === 'numeric' ? styles.z_input_numeric : styles.z_input_text}
        onKeyDown={type === 'numeric' ? handleOnKeyDown : undefined}
      />
    </div>
  ) : (
    <div>
      {type === 'numeric' ? currency(defaultValue as string, { separator: ',' }).format() : defaultValue}
    </div>
  );
}

EditableCell.defaultProps = {
  shouldFocus: false,
};
