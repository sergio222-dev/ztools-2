import styles from './AddAccountForm.module.scss';
import { Input } from '@atoms/Input/Input';
import { ButtonFilled } from '@atoms/Button/ButtonFilled';
import { Signal } from '@preact/signals-react';
import { Typography } from '@atoms/Typography/Typography';
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useAccountHook } from '@core/budget/account/application/adapter/useAccount.hook';
import { v4 as uuidv4 } from 'uuid';
import { IconButton } from '@atoms/Button/IconButton';
import { RxCross2 } from 'react-icons/rx';
import cls from 'classnames';
import { useTransactionHook } from '@core/budget/transaction/application/adapters/useTransaction.hook';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';

interface AddAccountFormProperties {
  isOpen: Signal<boolean>;
}
export function AddAccountForm({ isOpen }: AddAccountFormProperties) {
  // STATE
  const formReference = useRef<HTMLFormElement>(null);
  const accountNameInputReference = useRef<HTMLInputElement>(null);
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  //SERVICES
  const { createAccount } = useAccountHook();
  const { createData } = useTransactionHook();
  const { findAdjustmentSubcategoryId } = useCategoryHook(new Date());
  //HANDLERS
  const handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    isOpen.value = false;
    if (formReference.current === null) return;
    const addAccountForm = new FormData(formReference.current);
    const newAccountName = addAccountForm.get('accountName') as string;
    const newAccountBalance = addAccountForm.get('accountBalance') as string;
    if (newAccountName === '') return;
    if (newAccountBalance === '') return;
    const accountId = uuidv4();
    const subCategoryId = findAdjustmentSubcategoryId();
    const isBalanceNegative = newAccountBalance.includes('-');

    void createAccount({
      id: accountId,
      name: newAccountName,
      balance: '',
    });
    void createData(
      new Transaction(
        uuidv4(),
        isBalanceNegative ? '0' : newAccountBalance,
        isBalanceNegative ? newAccountBalance.replace('-', '') : '0',
        'Starting Balance',
        '',
        subCategoryId,
        new Date().toISOString(),
        true,
        accountId,
      ),
    );
  };

  const handleAccountNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAccountName(value);
    updateSaveButtonState(value, accountBalance);
  };

  const handleAccountBalanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAccountBalance(value);
    updateSaveButtonState(accountName, value);
  };

  // Update the disabled state of the Save button based on input values
  const updateSaveButtonState = (name: string, balance: string) => {
    const isDisabled = !name.trim() || !balance.trim();
    setIsSaveDisabled(isDisabled);
  };

  useEffect(() => {
    accountNameInputReference.current?.focus();
  }, []);

  return (
    <form
      name="add-account"
      className={styles.add_account_form}
      ref={formReference}
      onSubmit={handleFormSubmit}
    >
      <div>
        <div className={cls(styles.add_account_modal_title)}>
          <div className={styles.title_text}>
            <Typography variant="bold" Component="h1" size="large">
              Add Account
            </Typography>
          </div>
          <IconButton
            type="reset"
            onClick={() => (isOpen.value = false)}
            className={styles.add_account_modal_cancel_button}
          >
            <RxCross2 />
          </IconButton>
        </div>
        <div className={styles.add_account_modal_form_body}>
          <div>
            <label htmlFor="accountName">
              <div className={styles.add_account_modal_input_header}>
                <Typography variant="semi-bold" size="normal">
                  Give it a nickname
                </Typography>
              </div>
            </label>
            <Input
              id="accountName"
              name="accountName"
              className={styles.add_account_modal_input}
              onChange={handleAccountNameChange}
              ref={accountNameInputReference}
            />
          </div>
          <div>
            <label htmlFor="accountBalance">
              <div className={styles.add_account_modal_input_header}>
                <Typography variant="semi-bold" size="normal">
                  What is your current account balance?
                </Typography>
              </div>
            </label>
            <Input
              id="accountBalance"
              name="accountBalance"
              className={styles.add_account_modal_input}
              onChange={handleAccountBalanceChange}
            />
          </div>
        </div>
        <div className={styles.add_account_modal_footer_buttons}>
          <ButtonFilled
            type="submit"
            className={styles.add_account_modal_footer_save_button}
            disabled={isSaveDisabled}
          >
            {' '}
            Save{' '}
          </ButtonFilled>
        </div>
      </div>
    </form>
  );
}
