import { ChangeEvent, FocusEvent, HTMLAttributes, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@atoms/Input/Input';
import styles from '@molecules/EditableCell/EditableCell.module.scss';
import { isKeyboardEvent } from '@testing-library/user-event/event/eventMap';

interface EditableCellProperties extends HTMLAttributes<HTMLInputElement> {
  isEditable: boolean;
  onChangeValue?: (value: string) => void;
  type?: string;
}

export function EditableCell(properties: EditableCellProperties) {
  const { defaultValue, onBlur, isEditable, type, onChangeValue } = properties;

  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(defaultValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(event);
  };

  const handleOnChangeNumeric = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d\s.A-Za-z]/g, '');
    onChangeValue && onChangeValue(value);
    setValue(value);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeValue && onChangeValue(event.target.value);
    setValue(event.target.value);
  };

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
      !event.ctrlKey
    ) {
      event.preventDefault();
    }
  };

  return isEditable ? (
    <Input
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
