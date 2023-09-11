import { ButtonUnfilled, ButtonFilled } from '../../atoms';
import styles from './EditableFooterButtons.module.scss';
import { MouseEventHandler } from 'react';

interface EditableFooterButtonsProperties<T> {
  onSave: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  className: string;
}

export const EditableFooterButtons = <T,>({
  onSave,
  onCancel,
  className,
}: EditableFooterButtonsProperties<T>) => {
  return (
    // <div className="z_flex z_flex_jc_right" style={{ height: '10px' }}>
    <td className={className}>
      <ButtonUnfilled className={styles.cancel_button} onClick={onCancel}>
        {' '}
        Cancel{' '}
      </ButtonUnfilled>
      <ButtonFilled className={styles.save_button} onClick={onSave}>
        {' '}
        Save{' '}
      </ButtonFilled>
    </td>
  );
};
