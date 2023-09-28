import { Signal } from '@preact/signals-react';
// eslint-disable-next-line import/default
import React, { SyntheticEvent, useEffect, useRef } from 'react';
import { useAccountHook } from '@core/budget/account/application/adapter/useAccount.hook';
import styles from './EditAccountForm.module.scss';
import cls from 'classnames';
import { Typography } from '@atoms/Typography/Typography';
import { IconButton } from '@atoms/Button/IconButton';
import { RxCross2 } from 'react-icons/rx';
import { Input } from '@atoms/Input/Input';
import { ButtonFilled } from '@atoms/Button/ButtonFilled';
import { Account } from '@core/budget/account/domain/Account';
import { ButtonUnfilled } from '@atoms/Button/ButtonUnfilled';
import { useTransactionHook } from '@core/budget/transaction/application/adapters/useTransaction.hook';
import { Transaction } from '@core/budget/transaction/domain/Transaction';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';
import { v4 as uuidv4 } from 'uuid';

interface EditAccountFormProperties {
  isOpen: Signal<string>;
  account: Account;
}
export function EditAccountForm({ isOpen, account }: EditAccountFormProperties) {
  // STATE
  const formReference = useRef<HTMLFormElement>(null);
  const accountNameInputReference = useRef<HTMLInputElement>(null);

  //SERVICES
  const { updateAccount, deleteAccount } = useAccountHook();
  const { createData } = useTransactionHook();
  const { findAdjustmentSubcategoryId } = useCategoryHook(new Date());

  // HANDLERS
  const handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    isOpen.value = '';
    if (formReference.current === null) return;
    const editAccountForm = new FormData(formReference.current);
    const newAccountName = editAccountForm.get('accountName') as string;
    const newAccountWorkingBalance = editAccountForm.get('accountWorkingBalance') as string;
    if (newAccountName === '') return;
    if (newAccountWorkingBalance === '') return;
    const subCategoryId = findAdjustmentSubcategoryId();

    void updateAccount({
      id: account.id,
      name: newAccountName,
      balance: '',
    });

    if (Number(newAccountWorkingBalance) === Number(account.balance)) return;

    if (Number(newAccountWorkingBalance) > Number(account.balance)) {
      const adjustmentBalance = Number(newAccountWorkingBalance) - Number(account.balance);
      void createData(
        new Transaction(
          uuidv4(),
          adjustmentBalance.toString(),
          '0',
          'Manual Balance Adjustment',
          '',
          subCategoryId,
          new Date().toISOString(),
          true,
          account.id,
        ),
      );
      return;
    }
    if (Number(newAccountWorkingBalance) < Number(account.balance)) {
      const adjustmentBalance = Number(account.balance) - Number(newAccountWorkingBalance);
      void createData(
        new Transaction(
          uuidv4(),
          '0',
          adjustmentBalance.toString().replace('-', ''),
          'Manual Balance Adjustment',
          '',
          subCategoryId,
          new Date().toISOString(),
          true,
          account.id,
        ),
      );
    }
    return;
  };

  const deleteAccountHandler = (event: React.MouseEvent<HTMLButtonElement>, accountId: string) => {
    event.preventDefault();
    void deleteAccount(accountId);
    isOpen.value = '';
    return;
  };

  // EFFECTS

  useEffect(() => {
    accountNameInputReference.current?.focus();
  }, [accountNameInputReference]);

  return (
    <form
      name="edit-account"
      className={styles.edit_account_form}
      ref={formReference}
      onSubmit={handleFormSubmit}
    >
      <div>
        <div className={cls(styles.edit_account_modal_title)}>
          <div className={styles.title_text}>
            <Typography variant="title" Component="h1" size="normal">
              Edit Account
            </Typography>
          </div>
          <IconButton
            type="reset"
            onClick={() => (isOpen.value = '')}
            className={styles.edit_account_modal_cancel_button}
          >
            <RxCross2 />
          </IconButton>
        </div>
        <div className={styles.edit_account_modal_form_body}>
          <div className={styles.account_information_text}>
            <Typography variant="bold" size="large">
              Account Information
            </Typography>
          </div>
          <div>
            <label htmlFor="accountName">
              <div className={styles.edit_account_modal_input_header}>
                <Typography variant="semi-bold" size="normal">
                  Account Nickname
                </Typography>
              </div>
            </label>
            <Input
              id="accountName"
              name="accountName"
              className={styles.edit_account_modal_input}
              defaultValue={account.name}
              ref={accountNameInputReference}
            />
          </div>
          <hr style={{ width: '100%' }} />
          <div>
            <label htmlFor="accountWorkingBalance">
              <div className={styles.edit_account_modal_input_header}>
                <Typography variant="bold" size="large">
                  Working Balance
                </Typography>
              </div>
            </label>
            <Input
              id="accountWorkingBalance"
              name="accountWorkingBalance"
              className={styles.edit_account_modal_input}
              defaultValue={account.balance}
            />
            <Typography variant="info" size="small">
              An adjustment transaction will be created automatically if you change this amount.
            </Typography>
          </div>
        </div>
        <div className={styles.edit_account_modal_footer_buttons}>
          <ButtonUnfilled
            variant="delete"
            type="reset"
            onClick={event => {
              deleteAccountHandler(event, account.id);
            }}
          >
            Delete
          </ButtonUnfilled>
          <div className={styles.cancel_save_buttons_flex}>
            <ButtonUnfilled type="reset" onClick={() => (isOpen.value = '')}>
              Cancel
            </ButtonUnfilled>
            <ButtonFilled type="submit" className={styles.edit_account_modal_footer_save_button}>
              Save
            </ButtonFilled>
          </div>
        </div>
      </div>
    </form>
  );
}
