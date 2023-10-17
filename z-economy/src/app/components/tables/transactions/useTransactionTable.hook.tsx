import { Cell, Row, Table } from '@tanstack/react-table';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { KeyboardEvent, useRef, useState } from 'react';
import { useTransactionHook } from '@core/budget/transaction/application/adapters/useTransaction.hook';
import { useOutsideClick } from '@utils/mouseUtils';
import { v4 as uuidv4 } from 'uuid';
import { chunkify, normalizeText } from '@utils/textUtils';
import { useTransactionTableColumnsHook } from './useTransactionTableColumns.hook';
import { createEmptyTransaction } from '@core/budget/transaction/domain/TransactionUtils';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';
import { useAccountHook } from '@core/budget/account/application/adapter/useAccount.hook';
import { useParams } from 'react-router';
import { Signal } from '@preact/signals-react';

export const useTransactionTableHook = () => {
  // STATE
  const [globalFilter, setGlobalFilter] = useState('');
  const [editingRow, setEditingRow] = useState('');
  const [disableDelete, setDisableDelete] = useState(true);
  const [selectedQty, setSelectedQty] = useState(0);

  // REFS
  const editableValue = useRef<Transaction>(createEmptyTransaction());
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line unicorn/no-useless-undefined
  const reference = useRef<HTMLDivElement>(undefined);
  const tableReference = useRef<Table<Transaction>>();
  const selectedColumnId = useRef('date');

  // SERVICES
  const { tdata, updateData, createData, deleteData, trigger, deleteFakeRow, deleteDataBatch } =
    useTransactionHook();
  const { subCats, cdata } = useCategoryHook(new Date());
  const { mutateAccountData } = useAccountHook();
  const { accountId } = useParams();

  // HANDLERS

  //Row handlers
  const handleOnEdit = async (
    row: Row<Transaction>,
    table: Table<Transaction>,
    cell: Cell<Transaction, string>,
  ) => {
    if (cell.id.includes('checkbox')) {
      if (row.getIsSelected()) {
        row.getIsExpanded() && row.toggleExpanded(false);
      }
      editingRow === row.id && setEditingRow('');
      if (disableDelete && !row.getIsSelected()) {
        setDisableDelete(false);
      }
      if (row.getIsSelected() && table.getSelectedRowModel().rows.filter(t => t.id !== '').length === 1) {
        setDisableDelete(true);
      }
      await row.toggleSelected();
      setSelectedQty(table.getSelectedRowModel().rows.filter(t => t.id !== '').length);
      return;
    }
    if (cell.id.includes('cleared') && row.id !== '') {
      const clearedTransaction = row.original;
      clearedTransaction.cleared = !clearedTransaction.cleared;
      void updateData(clearedTransaction as Transaction);
      return;
    }
    if (row.getIsSelected()) {
      if (editingRow !== row.id) {
        setEditingRow(row.id);
        editableValue.current =
          row.id === ''
            ? Object.assign({}, row.original, editableValue.current)
            : Object.assign({}, editableValue.current, row.original);
      }
      // console.log(editableValue.current.accountId);
      // if (!adata.some(a => a.id === editableValue.current.accountId)) editableValue.current.accountId = adata[0].id;
      selectedColumnId.current = cell.column.id;
      table.setExpanded(() => ({
        [row.id]: true,
      }));
      await table.setRowSelection(() => ({
        [row.id]: true,
      }));
      row.id !== '' && setSelectedQty(table.getSelectedRowModel().rows.length);
      return;
    }
    editingRow !== '' && setEditingRow('');
    editableValue.current = createEmptyTransaction();
    void deleteFakeRow();
    table.getIsSomeRowsExpanded() && table.toggleAllRowsExpanded(false);
    table.getIsSomeRowsSelected() && table.toggleAllRowsSelected(false);
    selectedColumnId.current = 'date';
    await row.toggleSelected();
    setSelectedQty(table.getSelectedRowModel().rows.length);
    disableDelete && setDisableDelete(false);
  };

  const handleRowOnKeyDown = (event: KeyboardEvent, row: Row<Transaction>) => {
    if (event.key === 'Escape' && editingRow === row.id) {
      handleCancelEdit(row);
    }
  };

  // Button handlers
  const handleSaveEdit = async (row: Row<Transaction>) => {
    const fakeRow = row.id === '';
    if (fakeRow) {
      editableValue.current.id = uuidv4();
      // Is still possible to paste invalid characters in the inflow/outflow fields, so we replace them before sending to the server
      editableValue.current.inflow = editableValue.current.inflow.replaceAll(/[^\d.]/g, '');
      editableValue.current.outflow = editableValue.current.outflow.replaceAll(/[^\d.]/g, '');
      if (editableValue.current.inflow === '') editableValue.current.inflow = '0';
      if (editableValue.current.outflow === '') editableValue.current.outflow = '0';
      void (await createData(editableValue.current as Transaction));
      void mutateAccountData();
      editingRow !== '' && setEditingRow('');
      editableValue.current = createEmptyTransaction();
      selectedColumnId.current = 'date';
      return;
    }
    // console.log(editableValue.current.subCategoryId);
    void (await updateData(editableValue.current as Transaction));
    void mutateAccountData();
    editingRow !== '' && setEditingRow('');
    editableValue.current = createEmptyTransaction();
    selectedColumnId.current = 'date';
    row.toggleExpanded(false);
    row.toggleSelected(false);
  };

  const handleCancelEdit = (row: Row<Transaction>) => {
    editingRow !== '' && setEditingRow('');
    createEmptyTransaction();
    selectedColumnId.current = 'date';
    row.toggleExpanded(false);
    void deleteFakeRow();
  };

  // TODO: delete button doesn't disable after usage.

  // TODO: when deleting transactions should reassign its subcategory monthly budget
  const handleDelete = async (isOpen: Signal<boolean>) => {
    if (!tableReference.current?.getIsSomeRowsSelected() && !tableReference.current?.getIsAllRowsSelected()) {
      return;
    }
    if (selectedQty > 1) {
      const selectedRows = tableReference.current?.getRowModel().rows.filter(row => row.getIsSelected());
      const selectedRowsIds = { ids: selectedRows?.map(row => row.id) };
      await selectedRows?.map(row => row.toggleSelected(false));
      setSelectedQty(tableReference.current?.getSelectedRowModel().rows.length);
      void (await deleteDataBatch(selectedRowsIds));
      void mutateAccountData();
      isOpen.value = false;
      return;
    }
    const row = tableReference.current?.getRowModel().rows.find(row => row.getIsSelected());
    await row?.toggleSelected(false);
    setSelectedQty(tableReference.current?.getSelectedRowModel().rows.length);
    void (await deleteData(row?.original as Transaction));
    void mutateAccountData();
    isOpen.value = false;
  };

  const handleDuplicate = async (isOpen: Signal<boolean>) => {
    if (!tableReference.current?.getIsSomeRowsSelected() && !tableReference.current?.getIsAllRowsSelected()) {
      return;
    }
    const selectedRows = tableReference.current?.getRowModel().rows.filter(row => row.getIsSelected());
    selectedRows?.map(
      row =>
        void createData(
          new Transaction(
            uuidv4(),
            row.original.inflow,
            row.original.outflow,
            row.original.payee,
            row.original.memo,
            row.original.subCategoryId,
            row.original.date,
            row.original.cleared,
            row.original.accountId,
          ),
        ),
    );
    void mutateAccountData();
    isOpen.value = false;
  };

  // Checkbox handlers
  const handleCellCheckboxOnChange = (row: Row<Transaction>) => {
    if (editingRow !== '' && editingRow === row.id) {
      setEditingRow('');
    }
  };

  const handleCheckboxOnKeyDown = async (event: KeyboardEvent<HTMLInputElement>, row: Row<Transaction>) => {
    if (row.getIsSelected() && event.key === 'Enter' && editingRow === '') {
      setEditingRow(row.id);
      await tableReference.current?.toggleAllRowsSelected(false);
      await tableReference.current?.setRowSelection(() => ({
        [row.id]: true,
      }));
      tableReference.current?.setExpanded(() => ({
        [row.id]: true,
      }));
      tableReference.current &&
        setSelectedQty(tableReference.current?.getSelectedRowModel().rows.filter(t => t.id !== '').length);
      return;
    }
    if ((editingRow !== row.id || editingRow === '') && event.key === 'Enter') {
      if (disableDelete && !row.getIsSelected()) {
        setDisableDelete(false);
      }
      await row.getToggleSelectedHandler()(row);
      tableReference.current &&
        setSelectedQty(tableReference.current?.getSelectedRowModel().rows.filter(t => t.id !== '').length);
      return;
    }
  };

  const handleHeaderCheckboxOnChange = async (table: Table<Transaction>) => {
    editingRow !== '' && setEditingRow('');
    table.getIsAllRowsSelected() && setDisableDelete(true);
    disableDelete && setDisableDelete(false);
    await table.toggleAllRowsSelected();
    table.toggleAllRowsExpanded(false);
    setSelectedQty(table.getSelectedRowModel().rows.length);
  };

  const handleHeaderCheckboxOnKeyDown = async (
    event: KeyboardEvent<HTMLInputElement>,
    table: Table<Transaction>,
  ) => {
    if (event.key === 'Enter') {
      await handleHeaderCheckboxOnChange(table);
      return;
    }
  };

  // Sorting handlers
  const handleSorting = (rowA: Row<Transaction>, rowB: Row<Transaction>, columnId: string) => {
    if (rowA.id === '' || rowB.id === '') return 0;

    const a: string = rowA.getValue(columnId);
    const b: string = rowB.getValue(columnId);

    if (a === undefined || b === undefined) return 0;

    const lowerA = normalizeText(a);
    const lowerB = normalizeText(b);

    if (lowerA === lowerB) {
      return 0;
    }

    const chunkedA = chunkify(lowerA);
    const chunkedB = chunkify(lowerB);

    for (let index = 0; index < Math.max(chunkedA.length, chunkedB.length); index++) {
      const aChunk = chunkedA[index] || '';
      const bChunk = chunkedB[index] || '';

      const aNumber = Number.parseInt(aChunk, 10);
      const bNumber = Number.parseInt(bChunk, 10);

      if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
        if (aNumber !== bNumber) {
          return aNumber - bNumber;
        }
      } else if (aChunk !== bChunk) {
        return aChunk < bChunk ? -1 : 1;
      }
    }
    return 0;

    // To use default react-table alphanumeric sorting:
    // return sortingFns.alphanumeric(rowA, rowB, columnId);
  };

  const handleClearedSorting = (rowA: Row<Transaction>, rowB: Row<Transaction>, columnId: string) => {
    if (rowA.id === '' || rowB.id === '') return 0;

    const a: boolean = rowA.getValue(columnId);
    const b: boolean = rowB.getValue(columnId);

    return a === b ? 0 : a ? -1 : 1;
  };

  // SIDE EFFECTS
  useOutsideClick(reference, () => {
    if (editingRow !== '') setEditingRow('');
    if (tableReference.current && tableReference.current?.getIsSomeRowsExpanded())
      tableReference.current.toggleAllRowsExpanded(false);
    void deleteFakeRow();
    tableReference.current &&
      setSelectedQty(tableReference.current?.getSelectedRowModel().rows.filter(t => t.id !== '').length);
    selectedColumnId.current = 'date';
  });

  const data = tdata.filter(transaction => {
    if (!accountId) return transaction;
    return transaction.accountId === accountId;
  });

  // COLUMNS
  const columns = useTransactionTableColumnsHook(
    data,
    handleHeaderCheckboxOnChange,
    handleHeaderCheckboxOnKeyDown,
    handleCellCheckboxOnChange,
    handleCheckboxOnKeyDown,
    handleSorting,
    handleClearedSorting,
    editableValue,
    editingRow,
    cdata,
  );

  return {
    columns,
    tableReference,
    reference,
    data,
    editableValue,
    globalFilter,
    disableDelete,
    setDisableDelete,
    selectedQty,
    setSelectedQty,
    handleDelete,
    setGlobalFilter,
    setEditingRow,
    handleOnEdit,
    handleSaveEdit,
    handleCancelEdit,
    trigger,
    handleRowOnKeyDown,
    selectedColumnId,
    subCats,
    handleDuplicate,
  };
};
