import { Row } from '@tanstack/react-table';
import { Button } from '../../atoms';

interface EditableFooterButtonsProperties<T> {
  onSave: (row: Row<T>) => void;
  onCancel: (row: Row<T>) => void;
}

// TODO: should be using button atoms
export const EditableFooterButtons = <T,>({}: EditableFooterButtonsProperties<T>) => {
  return (
    <div className="z_flex z_flex_jc_right">
      <Button>cancel</Button>
      <Button>save</Button>
    </div>
  );
};
