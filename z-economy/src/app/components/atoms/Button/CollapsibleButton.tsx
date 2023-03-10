import styles from './Button.module.scss';
import { ButtonProperties } from "./Button";
import cls from 'classnames';

export function CollapsibleButton(props: ButtonProperties) {
    const { className, ...rest } = props;
    return <button className={cls(styles.collapsible_main_button, className)} {...rest}></button>
}