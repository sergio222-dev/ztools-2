import styles from './Button.module.scss';
import { HtmlHTMLAttributes } from 'react';

export function CancelButton(props: HtmlHTMLAttributes<HTMLButtonElement>): JSX.Element {
  const { className, ...rest } = props;
  return (
    <button {...rest} className={`${className} ${styles.z_button_cancel}`}>
      Cancel
    </button>
  );
}
