import { RowData } from '@tanstack/react-table';
import { TextTypeInterface } from '../app/utils/table/types';
import { AccessorColumnDef, DisplayColumnDef, GroupColumnDef } from '@tanstack/table-core/src/types';
import { ValuesOf } from '../app/utils/UtilityTypes';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  type ColumnDef<TData extends RowData, TValue = ValuesOf<TData>> =
    | DisplayColumnDef<TData, TValue>
    | GroupColumnDef<TData, TValue>
    | AccessorColumnDef<TData, TValue>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    type: TextTypeInterface;
  }
}
