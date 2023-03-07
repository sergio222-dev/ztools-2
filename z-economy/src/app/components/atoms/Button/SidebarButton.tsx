import React, { HtmlHTMLAttributes, ReactNode, useState } from 'react';
import styles from './Button.module.scss';
import { act } from 'react-dom/test-utils';

interface SidebarButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  StartIcon?: ReactNode | undefined;
  active: boolean;
}

export function SidebarButton({
  className,
  active,
  StartIcon,
  children,
  ...rest
}: SidebarButtonProps): JSX.Element {
  return (
    <button
      {...rest}
      data-active={active}
      className={`${styles.z_sidebar_button} ${className ? className : ''}`}
    >
      {/* conditional rendering bug in chrome and edge, generate a gap above and bellow this component*/}
      {StartIcon && <div>{StartIcon}</div>}
      <div>{children}</div>
    </button>
  );
}