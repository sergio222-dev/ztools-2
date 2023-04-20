import { useTransactionTableHook } from './useTransactionTable.hook';
import { AllAccountPageTable } from './renders/AllAccountPageTable';

export function TransactionTableView() {
  const {
    columns,
    data,
    trigger,
    reference,
    tableReference,
    setEditingRow,
    handleSaveEdit,
    handleCancelEdit,
    handleOnEdit,
    handleRowOnKeyDown,
  } = useTransactionTableHook();

  return (
    <div ref={reference} style={{ display: 'flex' }}>
      <button onClick={() => trigger(tableReference, setEditingRow)}>apretar</button>
      <AllAccountPageTable
        tableReference={tableReference}
        columns={columns}
        data={data}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        handleOnEdit={handleOnEdit}
        handleRowOnKeyDown={handleRowOnKeyDown}
        trigger={trigger}
      />
    </div>
  );
}
