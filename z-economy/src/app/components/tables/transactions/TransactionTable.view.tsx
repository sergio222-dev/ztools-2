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
    handleOnEnterEditMode,
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
      />
      <div ref={reference} style={{ display: 'flex' }}>
        <AllAccountPageTable
          tableReference={tableReference}
          columns={columns}
          data={data}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          handleOnEnterEditMode={handleOnEnterEditMode}
          handleRowOnKeyDown={handleRowOnKeyDown}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </div>
  );
}
