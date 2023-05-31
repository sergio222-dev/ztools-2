import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Input } from '@atoms/Input/Input';

export function SearchDebounceInput({
  value: initialValue,
  onChange,
  debounce = 0,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <Input {...props} value={value} onChange={event => setValue(event.target.value)} />;
}
