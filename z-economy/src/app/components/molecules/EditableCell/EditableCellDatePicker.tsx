import { ChangeEvent, HTMLAttributes } from 'react';
import { useEditableCellHook } from '@molecules/EditableCell/useEditableCell.hook';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { Input } from '@atoms/Input/Input';
interface EditableCellDatePicker extends HTMLAttributes<HTMLInputElement> {
  isEditable: boolean;
  onChangeValue?: (value: string) => void;
  type?: string;
  shouldFocus?: boolean;
}

export function EditableCellDatePicker(properties: EditableCellDatePicker) {
  const { defaultValue, shouldFocus, onBlur, isEditable, onChangeValue } = properties;
  const { models, operators } = useEditableCellHook<HTMLInputElement>({
    defaultValue,
    shouldFocus,
    onBlur,
    onChangeValue,
  });

  const { inputReference, value } = models;
  const { handleOnChangeDate } = operators;

  return isEditable ? (
    <div>
      <DatePicker
        selected={new Date(value as string)}
        onChange={(date, event) => handleOnChangeDate(date, event as ChangeEvent<HTMLInputElement>)}
        dateFormat="dd/MM/yyyy"
        customInput={<Input ref={inputReference} />}
      />
    </div>
  ) : (
    <div>{format(new Date(defaultValue as string), 'dd/MM/yyyy')}</div>
  );
}
