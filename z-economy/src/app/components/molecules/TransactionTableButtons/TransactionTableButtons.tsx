import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Table } from '@tanstack/react-table';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { UtilityButton } from '@atoms/Button/UtilityButton';
import { AiFillPlusCircle } from 'react-icons/ai';
import styles from './TransactionTableButtons.module.scss';
import { Typography } from '@atoms/Typography/Typography';
import { SearchDebounceInput } from '@molecules/SearchDebounceInput/SearchDebounceInput';
import { TransactionEditDropdown } from '@molecules/TransactionEditDropdown/TransactionEditDropdown';
import { SubCategory } from '@core/budget/category/domain/SubCategory';

interface TransactionTableButtonsProperties {
  trigger: (
    tableReference: MutableRefObject<Table<Transaction> | undefined>,
    setEditingRow: Dispatch<SetStateAction<string>>,
    editableValue: MutableRefObject<Transaction>,
    setSelectedQty: Dispatch<SetStateAction<number>>,
    setDisableDelete: Dispatch<SetStateAction<boolean>>,
    subCats: SubCategory[],
  ) => void;
  tableReference: MutableRefObject<Table<Transaction> | undefined>;
  setEditingRow: Dispatch<SetStateAction<string>>;
  editableValue: MutableRefObject<Transaction>;
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  handleDelete: () => void;
  disableDelete: boolean;
  selectedQty: number;
  setSelectedQty: Dispatch<SetStateAction<number>>;
  setDisableDelete: Dispatch<SetStateAction<boolean>>;
  subCats: SubCategory[];
}
export function TransactionTableButtons({
  trigger,
  tableReference,
  setEditingRow,
  editableValue,
  globalFilter,
  setGlobalFilter,
  handleDelete,
  disableDelete,
  selectedQty,
  setSelectedQty,
  setDisableDelete,
  subCats,
}: TransactionTableButtonsProperties) {
  const handleAddTransaction = () => {
    if (globalFilter !== '') setGlobalFilter('');
    trigger(tableReference, setEditingRow, editableValue, setSelectedQty, setDisableDelete, subCats);
  };

  return (
    <div className={styles.t_table_buttons_main_div}>
      <UtilityButton StartIcon={<AiFillPlusCircle />} onClick={() => handleAddTransaction()} variant={'icon'}>
        <Typography>Add Transaction</Typography>
      </UtilityButton>
      <TransactionEditDropdown
        handleDelete={handleDelete}
        disableDelete={disableDelete}
        selectedQty={selectedQty}
      />
      <SearchDebounceInput
        value={globalFilter ?? ''}
        onChange={value => setGlobalFilter(String(value))}
        className={styles.t_table_search_input}
        placeholder="Search All Accounts..."
      />
    </div>
  );
}
