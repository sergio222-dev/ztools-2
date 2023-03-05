import styles from './Button.module.scss';

export function Button2(props: React.HtmlHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return <button className={`${styles.z_button2} ${className ? className : ''}`} {...rest}></button>;
}
