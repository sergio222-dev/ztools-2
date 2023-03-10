import styles from './Button.module.scss';
import {Button, ButtonProperties} from './Button';
import cls from 'classnames';

interface SidebarButtonProps extends ButtonProperties {
  active?: boolean;
}

export function SidebarButton({ className, active, ...rest }: SidebarButtonProps): JSX.Element {
  return <Button {...rest} data-active={active} className={cls(styles.z_sidebar_button, className)} />;
}
