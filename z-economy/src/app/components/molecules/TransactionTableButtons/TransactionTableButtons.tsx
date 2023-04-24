import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Table } from '@tanstack/react-table';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { UtilityButton } from '../../atoms/Button/UtilityButton';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import styles from './TransactionTableButtons.module.scss';
import { Typography } from '../../atoms/Typography/Typography';
import { SearchDebounceInput } from '../../molecules/SearchDebounceInput/SearchDebounceInput';

interface TransactionTableButtonsProperties {
  trigger: (
    tableReference: MutableRefObject<Table<Transaction> | undefined>,
    setEditingRow: Dispatch<SetStateAction<string>>,
    editableValue: MutableRefObject<
      (object & { [p: string]: string }) | (Transaction & { [p: string]: never })
    >,
  ) => void;
  tableReference: MutableRefObject<Table<Transaction> | undefined>;
  setEditingRow: Dispatch<SetStateAction<string>>;
  editableValue: MutableRefObject<
    (object & { [p: string]: string }) | (Transaction & { [p: string]: never })
  >;
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  handleDelete: () => void;
}
export function TransactionTableButtons({
  trigger,
  tableReference,
  setEditingRow,
  editableValue,
  globalFilter,
  setGlobalFilter,
  handleDelete,
}: TransactionTableButtonsProperties) {
  const handleAddTransaction = () => {
    if (globalFilter !== '') setGlobalFilter('');
    trigger(tableReference, setEditingRow, editableValue);
  };

  return (
    <div className={styles.z_table_util_buttons}>
      <UtilityButton StartIcon={<AiFillPlusCircle />} onClick={() => handleAddTransaction()} variant={'icon'}>
        <Typography>Add Transaction</Typography>
      </UtilityButton>
      <UtilityButton StartIcon={<MdEdit />} variant={'icon'} onClick={handleDelete}>
        <Typography>Edit</Typography>
      </UtilityButton>
      <SearchDebounceInput
        value={globalFilter ?? ''}
        onChange={value => setGlobalFilter(String(value))}
        className={styles.z_table_search_input}
        placeholder="Search All Accounts..."
      />
    </div>
  );
}
