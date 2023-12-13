import {
  ChangeEvent,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  RefObject,
} from 'react';

interface useEditableCellHookProperties<T extends HTMLInputElement | HTMLSelectElement> {
  defaultValue: HTMLAttributes<T>['defaultValue'];
  onBlur: HTMLAttributes<T>['onBlur'];
  onChangeValue?: (value: string) => void;
  shouldFocus?: boolean;
}

interface useEditableCellHookReturnType<T extends HTMLInputElement | HTMLSelectElement> {
  models: {
    inputReference: RefObject<T>;
    value: HTMLAttributes<T>['defaultValue'];
  };
  operators: {
    handleOnBlur: (event: FocusEvent<T>) => void;
    handleOnChange: (event: ChangeEvent<T>) => void;
    handleOnChangeNumeric: (event: ChangeEvent<T>) => void;
    handleOnKeyDown: (event: KeyboardEvent<T>) => void;
    handleOnChangeDate: (date: Date | null, event: ChangeEvent<T>) => void;
  };
}

function isInput(element: HTMLInputElement | HTMLSelectElement): element is HTMLInputElement {
  return (element as HTMLInputElement)?.select !== undefined;
}

export function useEditableCellHook<T extends HTMLInputElement | HTMLSelectElement>({
  defaultValue,
  onBlur,
  onChangeValue,
  shouldFocus,
}: useEditableCellHookProperties<T>): useEditableCellHookReturnType<T> {
  // STATE
  const [value, setValue] = useState(defaultValue);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line unicorn/no-useless-undefined
  const inputReference = useRef<T>(undefined);

  // HANDLERS
  const handleOnBlur = (event: FocusEvent<T>) => {
    onBlur && onBlur(event);
  };
  const handleOnChangeNumeric = (event: ChangeEvent<T>) => {
    const value = event.target.value.replace(/[^\d\s.A-Za-z]/g, '');
    onChangeValue && onChangeValue(value);
    setValue(value);
  };
  const handleOnChange = (event: ChangeEvent<T>) => {
    onChangeValue && onChangeValue(event.target.value);
    setValue(event.target.value);
  };

  const handleOnChangeDate = (date: Date | null, event: ChangeEvent<T>) => {
    if (event) {
      onChangeValue && onChangeValue(event.target.value);
      setValue(event.target.value);
    }
    onChangeValue && onChangeValue(date?.toISOString() ?? '');
    setValue(date?.toISOString);
  };
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleOnKeyDown = (event: KeyboardEvent<T>) => {
    const regex = /^[\d.]/;

    if (event.key === 'Enter') {
      inputReference.current?.blur();
    }

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
      if (isInput(inputReference.current)) {
        inputReference.current?.select();
      }
    }
  }, [shouldFocus]);

  return {
    models: {
      value,
      inputReference,
    },
    operators: {
      handleOnBlur,
      handleOnChange,
      handleOnChangeNumeric,
      handleOnKeyDown,
      handleOnChangeDate,
    },
  };
}
