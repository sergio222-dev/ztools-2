import styles from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';
import { Typography } from '@atoms/Typography/Typography';
import cls from 'classnames';

interface ButtonUnfilledProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'normal' | 'delete';
}

export function ButtonUnfilled({ ...props }: ButtonUnfilledProperties): JSX.Element {
  const { className, children, variant, ...rest } = props;
  return (
    <button {...rest} className={cls(className, styles[`variant_${variant}`], styles.z_button_unfilled)}>
      <Typography>{children}</Typography>
    </button>
  );
}

ButtonUnfilled.defaultProps = {
  variant: 'normal',
};
