import { Cell, Row, Table } from '@tanstack/react-table';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { KeyboardEvent, MutableRefObject, useRef, useState } from 'react';
import { useTransaction } from '@core/budget/transaction/application/adapters/useTransaction';
import { useOutsideClick } from '@utils/mouseUtils';
import { v4 as uuidv4 } from 'uuid';
import { chunkify, normalizeText } from '@utils/textUtils';
import { useTransactionTableColumnsHook } from './useTransactionTableColumns.hook';

export const useTransactionTableHook = () => {
  // STATE
  const [globalFilter, setGlobalFilter] = useState('');
  const [editingRow, setEditingRow] = useState('');
  const editableValue = useRef<Record<keyof Transaction, string> | Record<string, never>>({});
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line unicorn/no-useless-undefined
  const reference = useRef<HTMLDivElement>(undefined);
  const tableReference = useRef<Table<Transaction>>();

  // SERVICES
  const { data, updateData, createData, deleteData, trigger, deleteFakeRow } = useTransaction();

  // HANDLERS
  const handleOnEnterEditMode = (
    row: Row<Transaction>,
    table: Table<Transaction>,
    cell: Cell<Transaction, string>,
  ) => {
    // if (cell.id.includes('checkbox')) {
    //   editingRow === row.id && setEditingRow('');
    //   return;
    // }
    // if (row.getIsSelected()) {
    editingRow !== row.id && setEditingRow(row.id);
    editableValue.current = Object.assign(row.original, editableValue.current);
    // return;
    // }
    // editingRow !== '' && setEditingRow('');
    // editableValue.current = {};
    // void deleteFakeRow();
  };

  const handleSaveEdit = (row: Row<Transaction>, selectedColumnId: { current: string }) => {
    if (row.id === '') {
      editableValue.current.id = uuidv4();
      if (editableValue.current.inflow === '') editableValue.current.inflow = '0';
      if (editableValue.current.outflow === '') editableValue.current.outflow = '0';
      void createData(editableValue.current as Transaction);
      editingRow !== '' && setEditingRow('');
      editableValue.current = {};
      selectedColumnId.current = 'date';
      return;
    }
    void updateData(editableValue.current as Transaction);
    editingRow !== '' && setEditingRow('');
    editableValue.current = {};
    selectedColumnId.current = 'date';
    row.toggleExpanded(false);
    row.toggleSelected(false);
  };

  const handleCancelEdit = (row: Row<Transaction>, selectedColumnId: { current: string }) => {
    editingRow !== '' && setEditingRow('');
    editableValue.current = {};
    selectedColumnId.current = 'date';
    row.toggleExpanded(false);
    void deleteFakeRow();
  };

  const handleDelete = () => {
    if (!tableReference.current?.getIsSomeRowsSelected() && !tableReference.current?.getIsAllRowsSelected()) {
      return;
    }
    const row = tableReference.current?.getRowModel().rows.find(row => row.getIsSelected());

    void deleteData(row?.original as Transaction);
  };

  const handleCheckboxOnKeyDown = (event: KeyboardEvent<HTMLInputElement>, row: Row<Transaction>) => {
    if (row.getIsSelected() && event.key === 'Enter' && editingRow === '') {
      setEditingRow(row.id);
      tableReference.current?.toggleAllRowsSelected(false);
      tableReference.current?.setRowSelection(() => ({
        [row.id]: true,
      }));
      tableReference.current?.setExpanded(() => ({
        [row.id]: true,
      }));
      return;
    }
    if (editingRow !== row.id && event.key === 'Enter') {
      row.getToggleSelectedHandler()(row);
      return;
    }
    if (editingRow === '' && event.key === 'Enter') {
      row.getToggleSelectedHandler()(row);
      return;
    }
  };

  const handleHeaderCheckboxOnCLick = (table: Table<Transaction>) => {
    editingRow !== '' && setEditingRow('');
    table.toggleAllRowsExpanded(false);
  };

  const handleCellCheckboxOnClick = (row: Row<Transaction>) => {
    if (editingRow !== '' && editingRow === row.id) {
      setEditingRow('');
    }
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
  });

  // COLUMNS
  const columns = useTransactionTableColumnsHook(
    data,
    handleHeaderCheckboxOnCLick,
    handleCellCheckboxOnClick,
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
    handleDelete,
    setGlobalFilter,
    setEditingRow,
    handleOnEnterEditMode,
    handleSaveEdit,
    handleCancelEdit,
    trigger,
    handleRowOnKeyDown,
  };
};
