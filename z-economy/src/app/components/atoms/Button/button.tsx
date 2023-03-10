import styles from './button.module.scss';
import { HtmlHTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';

export interface ButtonProperties extends HtmlHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  StartIcon?: ReactNode | undefined;
}

export function Button(properties: ButtonProperties): JSX.Element {
  const { className, variant, children, StartIcon, ...rest } = properties;
  let variantClassName;

  switch (variant) {
    case 'primary': {
      variantClassName = '';
      break;
    }
    default: {
      variantClassName = '';
    }
  }

  return (
    <button className={cls(styles.z_button, className)} {...rest}>
      {/* conditional rendering bug in chrome and edge, generate a gap above and bellow this component*/}
      {StartIcon && <div style={{ display: 'flex' }}>{StartIcon}</div>}
      {children && <div>{children}</div>}
    </button>
  );
}
