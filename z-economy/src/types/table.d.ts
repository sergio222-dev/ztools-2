import { RowData } from '@tanstack/react-table';
import { TextTypeInterface } from '@utils/table/types';
import { Cell, Column, Row, Table } from '@tanstack/table-core/src/types';
import { Getter } from '@tanstack/table-core/src/utils';
import { MutableRefObject } from 'react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  // type ColumnDef<TData extends RowData, TValue = Labels | undefined> =
  //   | DisplayColumnDef<TData, TValue>
  //   | GroupColumnDef<TData, TValue>
  //   | AccessorColumnDef<TData, TValue>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    type: TextTypeInterface;
  }

  interface CellContext<TData extends RowData, TValue> {
    table: Table<TData>;
    column: Column<TData, TValue>;
    row: Row<TData>;
    cell: Cell<TData, TValue>;
    getValue: Getter<TValue>;
    renderValue: Getter<TValue | null>;
    shouldFocus?: boolean; // used to determine if the cell should be focused
    selectedColumnId?: MutableRefObject<string>; // used to determine if the cell is selected
  }
}
