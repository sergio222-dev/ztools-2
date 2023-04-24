import { useTransactionTableHook } from './useTransactionTable.hook';
import { AllAccountPageTable } from './renders/AllAccountPageTable';
import { TransactionTableButtons } from '@molecules/TransactionTableButtons/TransactionTableButtons';

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
    globalFilter,
    setGlobalFilter,
    handleDelete,
  } = useTransactionTableHook();

  return (
    <div>
      <TransactionTableButtons
        trigger={trigger}
        tableReference={tableReference}
        setEditingRow={setEditingRow}
        editableValue={editableValue}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        handleDelete={handleDelete}
      ></TransactionTableButtons>
      <div ref={reference} style={{ display: 'flex' }}>
        <AllAccountPageTable
          tableReference={tableReference}
          columns={columns}
          data={data}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          handleOnEdit={handleOnEdit}
          handleRowOnKeyDown={handleRowOnKeyDown}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </div>
  );
}
