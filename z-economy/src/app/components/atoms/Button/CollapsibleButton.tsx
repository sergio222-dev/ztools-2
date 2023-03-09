import styles from '../Button/Button.module.scss';
import {ButtonProps} from "./Button";
import cls from 'classnames';

export function CollapsibleButton(props: ButtonProps) {
    const {className, ...rest} = props;
    return <button className={cls(styles.collapsible_main_button, className)} {...rest}></button>
}