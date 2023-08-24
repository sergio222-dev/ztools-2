import { forwardRef, Ref, SelectHTMLAttributes } from 'react';
import styles from './Select.module.scss';
import cls from 'classnames';

function SelectBase(
  properties: SelectHTMLAttributes<HTMLSelectElement>,
  reference: Ref<HTMLSelectElement>,
): JSX.Element {
  const { className, ...rest } = properties;
  return <select className={cls(styles.z_select, className)} {...rest} ref={reference} />;
}

export const Select = forwardRef(SelectBase);
