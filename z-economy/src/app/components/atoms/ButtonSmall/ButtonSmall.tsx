import styles from './ButtonSmall.module.scss';

export function ButtonSmall(props: React.HtmlHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return <button className={`${styles.button_small} ${className ? className : ''}`} {...rest}></button>;
}
