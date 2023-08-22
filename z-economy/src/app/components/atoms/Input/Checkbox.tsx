import { Input } from '@atoms/Input/Input';
import { InputHTMLAttributes } from 'react';
import cls from 'classnames';

export function Checkbox(properties: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  const { className, ...rest } = properties;
  return <Input type="checkbox" className={className} {...rest} />;
}
