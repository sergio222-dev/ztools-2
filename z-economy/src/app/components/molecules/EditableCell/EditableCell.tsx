import { ChangeEvent, FocusEvent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Input } from '@atoms/Input/Input';

interface EditableCellProperties extends HTMLAttributes<HTMLInputElement> {
  isEditable: boolean;
}

export function EditableCell2(properties: EditableCellProperties) {
  const { defaultValue, onBlur, isEditable } = properties;

  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(defaultValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(event);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // return <Input defaultValue={value} onChange={handleOnChange} onBlur={handleOnBlur} />;
  return isEditable ? (
    <Input onChange={handleOnChange} onBlur={handleOnBlur} defaultValue={value} />
  ) : (
    <div>{defaultValue}</div>
  );
}
