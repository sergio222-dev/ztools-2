import styles from './Button.module.scss'

export function Button(props: React.HtmlHTMLAttributes<HTMLButtonElement>) {
    const {className, ...rest} = props
    return <button className={`${styles.z_button} ${className ? className : ''}`} {...rest}></button>;
}