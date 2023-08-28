import { HTMLAttributes } from 'react';
import { useEditableCellHook } from '@molecules/EditableCell/useEditableCell.hook';
import { SubCategory } from '@core/budget/category/domain/SubCategory';
import styles from '@molecules/EditableCell/EditableCell.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

type T = SubCategory[];

interface EditableCellCategoryProperties extends HTMLAttributes<HTMLSelectElement> {
  isEditable: boolean;
  onChangeValue?: (value: string) => void;
  type?: string;
  shouldFocus?: boolean;
  options?: T;
}

export function EditableCellDatePicker(properties: EditableCellCategoryProperties) {
  const { defaultValue, shouldFocus, onBlur, isEditable, onChangeValue, options } = properties;
  const { models, operators } = useEditableCellHook<HTMLSelectElement>({
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
        onChange={(date, event) => handleOnChangeDate(date, event)}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  ) : (
    <div>{format(new Date(defaultValue as string), 'dd/MM/yyyy')}</div>
  );
}
