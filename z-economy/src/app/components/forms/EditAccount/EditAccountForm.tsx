import { Signal } from '@preact/signals-react';
import React, { SyntheticEvent, useRef } from 'react';
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

interface EditAccountFormProperties {
  isOpen: Signal<string>;
  account: Account;
}
export function EditAccountForm({ isOpen, account }: EditAccountFormProperties) {
  // STATE
  const formReference = useRef(null);
  const accountNameInputReference = useRef<HTMLInputElement>(null);

  //SERVICES
  const { updateAccount, deleteAccount } = useAccountHook();

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
    void updateAccount({
      id: account.id,
      name: newAccountName,
      balance: '',
    });
  };

  const deleteAccountHandler = (event: React.MouseEvent<HTMLButtonElement>, accountId: string) => {
    event.preventDefault();
    void deleteAccount(accountId);
    isOpen.value = '';
    return;
  };

  // EFFECTS

  accountNameInputReference.current?.focus();

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
            <div className={styles.edit_account_modal_input_header}>
              <Typography variant="bold" size="normal">
                Account Nickname
              </Typography>
            </div>
            <Input
              name="accountName"
              className={styles.edit_account_modal_input}
              defaultValue={account.name}
              ref={accountNameInputReference}
            />
          </div>
          <hr style={{ width: '100%' }} />
          <div>
            {/* // TODO: implement creating a transaction for account balance readjustment on edit*/}
            <div className={styles.edit_account_modal_input_header}>
              <Typography variant="bold" size="large">
                Working Balance
              </Typography>
            </div>
            <Input
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
            type="reset"
            className={styles.edit_account_modal_footer_delete_button}
            onClick={event => {
              deleteAccountHandler(event, account.id);
            }}
          >
            Delete
          </ButtonUnfilled>
          <div className={styles.cancel_save_buttons_flex}>
            <ButtonUnfilled
              type="reset"
              className={styles.edit_account_modal_footer_cancel_button}
              onClick={() => (isOpen.value = '')}
            >
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
