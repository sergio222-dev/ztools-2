import React from 'react';
import { Button, ButtonProps } from './Button';
import styles from './Button.module.scss';

export function ButtonRound(props: ButtonProps): JSX.Element {
  const { className, ...rest } = props;
  return <Button {...rest} className={`${className} ${styles.z_button_round}`} />;
}
