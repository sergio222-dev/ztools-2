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
    disableDelete,
    setDisableDelete,
    selectedQty,
    setSelectedQty,
    selectedColumnId,
    subCats,
    handleDuplicate,
    tableContainerReference,
    fetchMoreTransactions,
    isLoadingMore,
    isReachingEnd,
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
        disableDelete={disableDelete}
        selectedQty={selectedQty}
        setSelectedQty={setSelectedQty}
        setDisableDelete={setDisableDelete}
        subCats={subCats}
        handleDuplicate={handleDuplicate}
      ></TransactionTableButtons>
      <div ref={reference}>
        <AllAccountPageTable
          tableReference={tableReference}
          columns={columns}
          tdata={data}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          handleOnEdit={handleOnEdit}
          handleRowOnKeyDown={handleRowOnKeyDown}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          selectedColumnId={selectedColumnId}
          tableContainerReference={tableContainerReference}
          fetchMoreTransactions={fetchMoreTransactions}
          isLoadingMore={isLoadingMore}
          isReachingEnd={isReachingEnd}
        />
      </div>
    </div>
  );
}
