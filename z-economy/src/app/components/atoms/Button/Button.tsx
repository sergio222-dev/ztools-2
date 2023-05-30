import styles from './Button.module.scss';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';

type ButtonVariants = 'primary' | 'base' | 'icon';

export interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  StartIcon?: ReactNode | undefined;
  variant?: ButtonVariants;
}

export function Button(properties: ButtonProperties): JSX.Element {
  const { className, children, StartIcon, variant, ...rest } = properties;

  return (
    <button className={cls(styles.z_button, styles[`variant_${variant}`], className)} {...rest}>
      {/* conditional rendering bug in chrome and edge, generate a gap above and bellow this component*/}
      {StartIcon && <div className="z_flex">{StartIcon}</div>}
      {children && <>{children}</>}
    </button>
  );
}

Button.defaultProps = {
  variant: 'primary',
};
