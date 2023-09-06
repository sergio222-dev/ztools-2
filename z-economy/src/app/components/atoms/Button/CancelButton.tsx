import styles from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';
import { Typography } from '@atoms/Typography/Typography';

export function CancelButton(props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  const { className, ...rest } = props;
  return (
    <button {...rest} className={`${className} ${styles.z_button_cancel}`}>
      <Typography>Cancel</Typography>
    </button>
  );
}
