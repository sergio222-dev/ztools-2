import { Row } from '@tanstack/react-table';
import { CancelButton, SaveButton } from '../../atoms';
import styles from './EditableFooterButtons.module.scss';

interface EditableFooterButtonsProperties<T> {
  onSave: (row: Row<T>) => void;
  onCancel: (row: Row<T>) => void;
}

export const EditableFooterButtons = <T,>({}: EditableFooterButtonsProperties<T>) => {
  return (
    <div className="z_flex z_flex_jc_right">
      <CancelButton className={styles.cancel_button} />
      <SaveButton className={styles.save_button} />
    </div>
  );
};
