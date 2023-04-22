import { InputHTMLAttributes, useEffect, useRef } from 'react';

interface IndeterminateCheckboxProperties extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate: boolean;
}

export function IndeterminateCheckbox({ indeterminate, checked, ...rest }: IndeterminateCheckboxProperties) {
  // const reference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // if (reference.current) {
    //   reference.current.indeterminate = !checked && indeterminate;
    // }
  }, [indeterminate, checked]);

  // TODO create checkbox ATOM
  return <input type="checkbox" checked={checked} {...rest} />;
}

// export function TableFilter({ column, table }: { column: Column<any, any>; table: Table<any> }) {
//   const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
//
//   return typeof firstValue === 'number' ? (
//     <div>
//       <input
//         type="number"
//         value={((column.getFilterValue() as any)?.[0] ?? '') as string}
//         onChange={element => column.setFilterValue((old: any) => [element.target.value, old?.[1]])}
//         placeholder={`Min`}
//       />
//       <input
//         type="number"
//         value={((column.getFilterValue() as any)?.[1] ?? '') as string}
//         onChange={element => column.setFilterValue((old: any) => [old?.[0], element.target.value])}
//         placeholder={`Max`}
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(column.getFilterValue() ?? '') as string}
//       onChange={element => column.setFilterValue(element.target.value)}
//       placeholder={`Search...`}
//     />
//   );
// }
