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
    editableValue,
  } = useTransactionTableHook();

  return (
    <div>
      <div>
        <button onClick={() => trigger(tableReference, setEditingRow, editableValue)}>apretar</button>
      </div>
      <div ref={reference} style={{ display: 'flex' }}>
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
    </div>
  );
}
