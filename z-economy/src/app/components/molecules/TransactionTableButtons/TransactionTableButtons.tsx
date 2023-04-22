import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import { Table } from '@tanstack/react-table';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { UtilityButton } from '../../atoms/Button/UtilityButton';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import styles from './TransactionTableButtons.module.scss';
import { Input } from '../../atoms/Input/Input';
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
}
export function TransactionTableButtons({
  trigger,
  tableReference,
  setEditingRow,
  editableValue,
  globalFilter,
  setGlobalFilter,
}: TransactionTableButtonsProperties) {
  return (
    <div className={styles.z_table_util_buttons}>
      <UtilityButton
        StartIcon={<AiFillPlusCircle />}
        onClick={() => trigger(tableReference, setEditingRow, editableValue)}
        variant={'icon'}
      >
        <Typography>Add Transaction</Typography>
      </UtilityButton>
      <UtilityButton StartIcon={<MdEdit />} variant={'icon'}>
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
