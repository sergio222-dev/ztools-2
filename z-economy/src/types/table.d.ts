import { UseSortByColumnProps } from 'react-table';

declare module 'react-table' {
  export interface HeaderGroup<D extends object> extends UseSortByColumnProps<D> {}
}
