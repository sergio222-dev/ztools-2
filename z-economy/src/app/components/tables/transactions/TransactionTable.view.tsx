import { useTransactionTableHook } from './useTransactionTable.hook';
import { AllAccountPageTable } from './renders/AllAccountPageTable';

export function TransactionTableView() {
  const { columns, data, reference, tableReference, handleSaveEdit, handleCancelEdit, handleOnEdit } =
    useTransactionTableHook();

  return (
    <div ref={reference} style={{ display: 'flex' }}>
      <AllAccountPageTable
        tableReference={tableReference}
        columns={columns}
        data={data}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        handleOnEdit={handleOnEdit}
      />
    </div>
  );
}
