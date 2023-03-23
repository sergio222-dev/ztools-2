import { PropsWithChildren } from 'react';
import styles from './Typography.module.scss';
import cls from 'classnames';

type SizeTypography = 'small' | 'normal' | 'large';

interface TypographyProperties {
  size: SizeTypography;
  Component: 'p' | 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant: 'title' | 'info' | 'normal' | 'balance';
}

export function Typography({ size, children, Component, variant }: PropsWithChildren<TypographyProperties>) {
  return (
    <Component className={cls(styles.typography, styles[`variant_${variant}`], styles[size])}>
      {children}
    </Component>
  );
}

Typography.defaultProps = {
  Component: 'p',
  size: 'normal',
  variant: 'normal',
};
