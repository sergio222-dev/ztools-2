import { Column } from '@tanstack/react-table';

export const getColumnType = <T>(column: Column<T>): string => {
  return column.columnDef.meta?.type.getType() ?? 'text';
};
