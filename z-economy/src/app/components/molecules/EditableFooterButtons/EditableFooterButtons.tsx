import { Row } from '@tanstack/react-table';

interface EditableFooterButtonsProperties<T> {
  onSave: (row: Row<T>) => void;
  onCancel: (row: Row<T>) => void;
}

// TODO: should be using buttons atoms
export const EditableFooterButtons = <T,>({}: EditableFooterButtonsProperties<T>) => {
  return (
    <div className="z_flex z_flex_jc_right">
      <button>cancel</button>
      <button>save</button>
    </div>
  );
};
