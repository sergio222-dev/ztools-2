import { ChangeEvent, FocusEvent, HTMLAttributes, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@atoms/Input/Input';
import styles from '@molecules/EditableCell/EditableCell.module.scss';

interface EditableCellProperties extends HTMLAttributes<HTMLInputElement> {
  isEditable: boolean;
  onChangeValue?: (value: string) => void;
  type?: string;
  shouldFocus?: boolean;
}

export function EditableCell(properties: EditableCellProperties) {
  const { defaultValue, shouldFocus, onBlur, isEditable, type, onChangeValue } = properties;

  // STATE
  const [value, setValue] = useState(defaultValue);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line unicorn/no-useless-undefined
  const inputReference = useRef<HTMLInputElement>(undefined);

  // HANDLERS
  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(event);
  };
  const handleOnChangeNumeric = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO: se puede hacer ctrl + v y poner texto en el input y si despues apretamos save se manda a la db.
    const value = event.target.value.replace(/[^\d\s.A-Za-z]/g, '');
    onChangeValue && onChangeValue(value);
    setValue(value);
  };
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeValue && onChangeValue(event.target.value);
    setValue(event.target.value);
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[\d.]/;

    if (
      !regex.test(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'Tab' &&
      event.key !== 'Home' &&
      event.key !== 'End' &&
      event.key !== 'F5' &&
      event.key !== 'Escape' &&
      !event.ctrlKey
    ) {
      event.preventDefault();
    }
  };

  // SIDE EFFECTS
  useEffect(() => {
    if (shouldFocus) {
      inputReference.current?.focus();
      inputReference.current?.select();
    }
  }, [shouldFocus]);

  return isEditable ? (
    <Input
      ref={inputReference}
      onChange={type === 'numeric' ? handleOnChangeNumeric : handleOnChange}
      onBlur={handleOnBlur}
      defaultValue={value}
      className={type === 'numeric' ? styles.z_input_numeric : styles.z_input_text}
      onKeyDown={type === 'numeric' ? handleOnKeyDown : undefined}
    />
  ) : (
    <div>{type === 'numeric' ? '$' + defaultValue : defaultValue}</div>
  );
}

EditableCell.defaultProps = {
  shouldFocus: false,
};
