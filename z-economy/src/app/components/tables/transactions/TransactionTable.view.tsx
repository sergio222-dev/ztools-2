import { useTransactionTableHook } from './useTransactionTable.hook';
import { AllAccountPageTable } from './renders/AllAccountPageTable';

export function TransactionTableView() {
  const {
    columns,
    data,
    trigger,
    reference,
    tableReference,
    handleSaveEdit,
    handleCancelEdit,
    handleOnEdit,
    handleRowOnKeyDown,
  } = useTransactionTableHook();

  return (
    <div ref={reference} style={{ display: 'flex' }}>
      <button onClick={() => trigger()}>apretar</button>
      <AllAccountPageTable
        tableReference={tableReference}
        columns={columns}
        data={data}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        handleOnEdit={handleOnEdit}
        handleRowOnKeyDown={handleRowOnKeyDown}
      />
    </div>
  );
}
