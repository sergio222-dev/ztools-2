import styles from './CollapsibleButton.module.scss'

export function CollapsibleButton(props: React.HtmlHTMLAttributes<HTMLButtonElement>) {
    const {className, ...rest} = props;
    return <button className={`${styles.collapsible_button} ${className ? className : ''}`} {...rest}></button>
}