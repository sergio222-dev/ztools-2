import styles from './Button.module.scss';
import { Button, ButtonProps } from './Button';
import cls from 'classnames';

interface SidebarButtonProps extends ButtonProps {
  active: boolean;
}

export function SidebarButton({ className, active, ...rest }: SidebarButtonProps): JSX.Element {
  console.log(className);
  return <Button {...rest} data-active={active} className={cls(styles.z_sidebar_button, className)} />;
}
