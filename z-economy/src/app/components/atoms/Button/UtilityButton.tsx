import styles from './Button.module.scss';
import { Button, ButtonProperties } from './Button';
import cls from 'classnames';

type UtilityButtonProperties = ButtonProperties;

export function UtilityButton({ className, ...rest }: UtilityButtonProperties): JSX.Element {
  return <Button {...rest} className={cls(styles.z_utility_button, className)} />;
}
