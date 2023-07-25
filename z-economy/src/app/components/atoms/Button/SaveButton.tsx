import styles from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';
import { Typography } from '@atoms/Typography/Typography';

export function SaveButton(props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  const { className, ...rest } = props;
  return (
    <button {...rest} className={`${className} ${styles.z_button_save}`}>
      <Typography>Save</Typography>
    </button>
  );
}
