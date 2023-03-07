import React, { HtmlHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface IconButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {}

export const IconButton = ({ className, ...rest }: IconButtonProps): JSX.Element => {
  return <button {...rest} className={`${styles.z_icon_button} ${className ? className : ''}`} />;
};
