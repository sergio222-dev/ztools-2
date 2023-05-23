import { Cell, Row, Table } from '@tanstack/react-table';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { KeyboardEvent, MutableRefObject, useRef, useState } from 'react';
import { useTransaction } from '@core/budget/transaction/application/adapters/useTransaction';
import { useOutsideClick } from '@utils/mouseUtils';
import { v4 as uuidv4 } from 'uuid';
import { chunkify, normalizeText } from '@utils/textUtils';
import { useTransactionTableColumnsHook } from './useTransactionTableColumns.hook';
import { createEmptyTransaction } from '@core/budget/budget/domain/TransactionUtils';

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

  // SERVICES
  const { data, updateData, createData, deleteData, trigger, deleteFakeRow, deleteDataBatch } =
    useTransaction();

  // HANDLERS

  //Row handlers
  const handleOnEdit = async (
    row: Row<Transaction>,
    table: Table<Transaction>,
    cell: Cell<Transaction, string>,
    selectedColumnId: MutableRefObject<string>,
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
    if (cell.id.includes('cleared')) {
      const clearedTransaction = row.original;
      clearedTransaction.cleared = !clearedTransaction.cleared;
      void updateData(clearedTransaction as Transaction);
      return;
    }
    if (row.getIsSelected()) {
      editingRow !== row.id && setEditingRow(row.id);
      editableValue.current =
        row.id === ''
          ? Object.assign({}, row.original, editableValue.current)
          : Object.assign({}, editableValue.current, row.original);
      selectedColumnId.current = cell.column.id;
      table.setExpanded(() => ({
        [row.id]: true,
      }));
      await table.setRowSelection(() => ({
        [row.id]: true,
      }));
      row.id !== '' && setSelectedQty(table.getSelectedRowModel().rows.length);
      console.log(row.original, 'original');
      console.log(editableValue.current, 'current');
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

  const handleRowOnKeyDown = (
    event: KeyboardEvent,
    row: Row<Transaction>,
    selectedColumnId: { current: string },
  ) => {
    if (event.key === 'Escape' && editingRow === row.id) {
      handleCancelEdit(row, selectedColumnId);
    }
  };

  // Button handlers
  const handleSaveEdit = (row: Row<Transaction>, selectedColumnId: { current: string }) => {
    if (row.id === '') {
      editableValue.current.id = uuidv4();
      // Is still possible to paste invalid characters in the inflow/outflow fields, so we replace them before sending to the server
      editableValue.current.inflow = editableValue.current.inflow.replaceAll(/[^\d.]/g, '');
      editableValue.current.outflow = editableValue.current.outflow.replaceAll(/[^\d.]/g, '');
      if (editableValue.current.inflow === '') editableValue.current.inflow = '0';
      if (editableValue.current.outflow === '') editableValue.current.outflow = '0';
      void createData(editableValue.current as Transaction);
      editingRow !== '' && setEditingRow('');
      editableValue.current = createEmptyTransaction();
      selectedColumnId.current = 'date';
      return;
    }
    void updateData(editableValue.current as Transaction);
    editingRow !== '' && setEditingRow('');
    editableValue.current = createEmptyTransaction();
    selectedColumnId.current = 'date';
    row.toggleExpanded(false);
    row.toggleSelected(false);
  };

  const handleCancelEdit = (row: Row<Transaction>, selectedColumnId: { current: string }) => {
    editingRow !== '' && setEditingRow('');
    createEmptyTransaction();
    selectedColumnId.current = 'date';
    row.toggleExpanded(false);
    void deleteFakeRow();
  };

  const handleDelete = async () => {
    console.log(selectedQty);
    if (!tableReference.current?.getIsSomeRowsSelected() && !tableReference.current?.getIsAllRowsSelected()) {
      return;
    }
    if (selectedQty > 1) {
      const selectedRows = tableReference.current?.getRowModel().rows.filter(row => row.getIsSelected());
      const selectedRowsIds = { ids: selectedRows?.map(row => row.id) };
      console.log(selectedRowsIds);
      await selectedRows?.map(row => row.toggleSelected(false));
      setSelectedQty(tableReference.current?.getSelectedRowModel().rows.length);
      void deleteDataBatch(selectedRowsIds);
      return;
    }
    const row = tableReference.current?.getRowModel().rows.find(row => row.getIsSelected());
    await row?.toggleSelected(false);
    setSelectedQty(tableReference.current?.getSelectedRowModel().rows.length);
    void deleteData(row?.original as Transaction);
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

  // SIDE EFFECTS
  // TODO: do selectedColumnId = 'date' inside this function.
  useOutsideClick(reference, () => {
    if (editingRow !== '') setEditingRow('');
    if (tableReference.current && tableReference.current?.getIsSomeRowsExpanded())
      tableReference.current.toggleAllRowsExpanded(false);
    void deleteFakeRow();
    tableReference.current &&
      setSelectedQty(tableReference.current?.getSelectedRowModel().rows.filter(t => t.id !== '').length);
  });

  // COLUMNS
  const columns = useTransactionTableColumnsHook(
    data,
    handleHeaderCheckboxOnChange,
    handleHeaderCheckboxOnKeyDown,
    handleCellCheckboxOnChange,
    handleCheckboxOnKeyDown,
    handleSorting,
    editableValue,
    editingRow,
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
  };
};
