import styles from './Input.module.scss';
import { forwardRef, HtmlHTMLAttributes, Ref } from 'react';
import cls from 'classnames';

export function Input(properties: HtmlHTMLAttributes<HTMLInputElement>): JSX.Element {
  const { className, ...rest } = properties;
  return <input className={cls(styles.z_input, className)} {...rest} />;
}
