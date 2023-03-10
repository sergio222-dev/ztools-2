import { HtmlHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import cls from 'classnames';

type IconButtonProperties = HtmlHTMLAttributes<HTMLButtonElement>

export const IconButton = ({ className, ...rest }: IconButtonProperties): JSX.Element => {
  return <button {...rest} className={cls(styles.z_icon_button, className)} />;
};
