import styles from './SideButton.module.scss'

export function SideButton(props: React.HtmlHTMLAttributes<HTMLButtonElement>) {
    const {className, ...rest} = props
    return <button className={`${styles.side_button} ${className ? className : ''}`} {...rest}></button>;
}