import styles from './Input.module.scss';
import { forwardRef, HtmlHTMLAttributes, Ref } from 'react';
import cls from 'classnames';

function InputBase(
  properties: HtmlHTMLAttributes<HTMLInputElement>,
  reference: Ref<HTMLInputElement>,
): JSX.Element {
  const { className, ...rest } = properties;
  return <input ref={reference} className={cls(styles.z_input, className)} {...rest} />;
}

export const Input = forwardRef(InputBase);
