import { Cell, ColumnDef, createColumnHelper, Row, Table } from '@tanstack/react-table';
import { useTransaction } from '@core/budget/transaction/application/adapters/useTransaction';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { ChangeEvent, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '@utils/mouseUtils';

interface AllAccountPageModel {
  loadedData: Transaction[];
  error: any;
  reference: RefObject<HTMLElement>;
  tableReference: MutableRefObject<Table<Transaction> | undefined>;
}

interface AllAccountPageOperators {
  EditableFooterSaveHandler: (row: Row<Transaction>, table: Table<Transaction>) => void;
  EditableFooterCancelHandler: (row: Row<Transaction>) => void;
  handleRowClick: (row: Row<Transaction>, table: Table<Transaction>, cell: Cell<Transaction, string>) => void;
}

export function useAllAccountPageHooks(): [AllAccountPageModel, AllAccountPageOperators] {
  // MODEL
  const [editingRow, setEditingRow] = useState('');
  // const [editableValue, setEditableValue] = useState<Transaction | object>({});
  // const editableValue = useRef<Transaction | object>({});

  const editableValue = useRef<(object & { [key: string]: string }) | (Transaction & { [key: string]: any })>(
    {},
  );

  const { data, error, isLoading, updateData, createData } = useTransaction();
  const reference = useRef<HTMLElement>(null);
  const tableReference = useRef<Table<Transaction>>();
  const loadedData = isLoading ? [] : error ? [] : (data as Transaction[]);

  useOutsideClick(reference, () => {
    if (editingRow !== '') setEditingRow('');
    if (tableReference.current && tableReference.current?.getIsSomeRowsExpanded())
      tableReference.current.toggleAllRowsExpanded(false);
  });

  // data?.map(transaction => {
  //   transaction.category = 'Entertainment';
  // });

  // OPERATORS
  const handleRowClick = (
    row: Row<Transaction>,
    table: Table<Transaction>,
    cell: Cell<Transaction, string>,
  ) => {
    if (cell.id.includes('checkbox')) {
      if (row.getIsSelected()) {
        row.getIsExpanded() && row.toggleExpanded(false);
      }
      row.toggleSelected();
      return;
    }
    if (row.getIsSelected()) {
      editingRow !== row.id && setEditingRow(row.id);
      // setEditableValue(row.original);
      editableValue.current = row.original;
      table.setExpanded(() => ({
        [row.id]: true,
      }));
      table.setRowSelection(() => ({
        [row.id]: true,
      }));
      return;
    }
    editingRow !== '' && setEditingRow('');
    // setEditableValue({});
    editableValue.current = {};
    table.getIsSomeRowsExpanded() && table.toggleAllRowsExpanded(false);
    table.getIsSomeRowsSelected() && table.toggleAllRowsSelected(false);
    row.toggleSelected();
  };

  const EditableFooterSaveHandler = (row: Row<Transaction>) => {
    void updateData(editableValue.current as Transaction);
    editingRow !== '' && setEditingRow('');
    // setEditableValue({});
    editableValue.current = {};
    row.toggleExpanded(false);
    row.toggleSelected(false);
  };

  const EditableFooterCancelHandler = (row: Row<Transaction>) => {
    editingRow !== '' && setEditingRow('');
    row.toggleExpanded(false);
    row.toggleSelected(false);
  };

  // SIDE EFFECTS
  // useEffect(() => {
  //   if (editingRow === '') return;
  //
  //   void updateData(editableValue as Transaction);
  // }, [editableValue]);

  return [
    {
      loadedData,
      error,
      reference,
      tableReference,
    },
    {
      handleRowClick,
      EditableFooterSaveHandler,
      EditableFooterCancelHandler,
    },
  ];
}
