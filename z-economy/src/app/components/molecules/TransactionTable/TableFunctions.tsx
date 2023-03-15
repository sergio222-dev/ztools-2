import { HTMLProps, useEffect, useRef } from 'react';
import { Column, Table } from '@tanstack/react-table';

export function IndeterminateCheckbox({
  indeterminate,
  className = '',
  checked,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const reference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && reference.current) {
      reference.current.indeterminate = !checked && indeterminate;
    }
  }, [indeterminate, checked]);

  return (
    <input
      type="checkbox"
      ref={reference}
      checked={checked}
      className={className + 'z_cursor_pointer'}
      {...rest}
    />
  );
}

export function Filter({ column, table }: { column: Column<any, any>; table: Table<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={((column.getFilterValue() as any)?.[0] ?? '') as string}
        onChange={e => column.setFilterValue((old: any) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={((column.getFilterValue() as any)?.[1] ?? '') as string}
        onChange={e => column.setFilterValue((old: any) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(column.getFilterValue() ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}
