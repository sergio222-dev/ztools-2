import styles from './Button.module.scss';
import { HtmlHTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';

export interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  StartIcon?: ReactNode | undefined;
}

export function Button(props: ButtonProps): JSX.Element {
  const { className, variant, children, StartIcon, ...rest } = props;
  let variantClassName;

  switch (variant) {
    case 'primary':
      variantClassName = '';
      break;
    default:
      variantClassName = '';
  }

  return (
    <button className={cls(styles.z_button, className)} {...rest}>
      {/* conditional rendering bug in chrome and edge, generate a gap above and bellow this component*/}
      {StartIcon && <div style={{ display: 'flex' }}>{StartIcon}</div>}
      {children && <div>{children}</div>}
    </button>
  );
}
