import { Button, ButtonProperties } from './Button';
import styles from './Button.module.scss';

export function ButtonRound(props: ButtonProperties): JSX.Element {
  const { className, ...rest } = props;
  return <Button {...rest} className={`${className} ${styles.z_button_round}`} />;
}
