import { ButtonHTMLAttributes } from 'react';
import cls from 'classnames';
import styles from './Button.module.scss';

type TextButtonVariants = 'normal' | 'underline';

interface TextButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: TextButtonVariants;
}
export function TextButton(properties: TextButtonProperties) {
  const { className, children, variant, ...rest } = properties;

  return (
    <button className={cls(styles.text_button, styles[`variant_${variant}`], className)} {...rest}>
      {children}
    </button>
  );
}

TextButton.defaultProps = {
  variant: 'normal',
};
