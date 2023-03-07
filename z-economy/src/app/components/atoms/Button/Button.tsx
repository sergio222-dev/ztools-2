import styles from './Button.module.scss';
import { HtmlHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  Icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export function Button(props: ButtonProps): JSX.Element {
  const { className, variant, ...rest } = props;
  let variantClassName;

  switch (variant) {
    case 'primary':
      variantClassName = '';
      break;
    default:
      variantClassName = '';
  }

  return (
    <button className={`${styles.z_button} ${className ? className : ''} ${variantClassName}`} {...rest} />
  );
}

