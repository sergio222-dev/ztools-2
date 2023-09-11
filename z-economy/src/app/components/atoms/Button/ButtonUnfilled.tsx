import styles from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';
import { Typography } from '@atoms/Typography/Typography';

export function ButtonUnfilled(props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  const { className, children, ...rest } = props;
  return (
    <button {...rest} className={`${className} ${styles.z_button_cancel}`}>
      <Typography>{children}</Typography>
    </button>
  );
}