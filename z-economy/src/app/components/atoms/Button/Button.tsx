import styles from './Button.module.scss';
import { HtmlHTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';

export interface ButtonProperties extends HtmlHTMLAttributes<HTMLButtonElement> {
  // variant?: 'primary' | 'secondary' | 'tertiary';
  StartIcon?: ReactNode | undefined;
}

export function Button(properties: ButtonProperties): JSX.Element {
  const { className, children, StartIcon, ...rest } = properties;

  return (
    <button className={cls(styles.z_button, className)} {...rest}>
      {/* conditional rendering bug in chrome and edge, generate a gap above and bellow this component*/}
      {StartIcon && <div className="z_flex">{StartIcon}</div>}
      {children && <>{children}</>}
    </button>
  );
}
