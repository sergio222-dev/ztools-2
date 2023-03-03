import styles from './SideButtonSmall.module.scss';

export function SideButtonSmall(props: React.HtmlHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return <button className={`${styles.side_button_small} ${className ? className : ''}`} {...rest}></button>;
}
