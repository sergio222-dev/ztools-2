import { Signal } from '@preact/signals-react';
import { Ref, SyntheticEvent, useRef } from 'react';
import { useAccountHook } from '@core/budget/account/application/adapter/useAccount.hook';
import { v4 as uuidv4 } from 'uuid';
import styles from './EditAccountForm.module.scss';
import cls from 'classnames';
import { Typography } from '@atoms/Typography/Typography';
import { IconButton } from '@atoms/Button/IconButton';
import { RxCross2 } from 'react-icons/rx';
import { Input } from '@atoms/Input/Input';
import { ButtonFilled } from '@atoms/Button/ButtonFilled';
import { Account } from '@core/budget/account/domain/Account';

interface EditAccountFormProperties {
  isOpen: Signal<string>;
  account: Account;
}
export function EditAccountForm({ isOpen, account }: EditAccountFormProperties) {
  // STATE
  const formReference = useRef(null);
  const accountNameInputReference = useRef<HTMLInputElement>(null);

  //SERVICES
  const { updateAccount } = useAccountHook();
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
      balance: { _amount: newAccountWorkingBalance },
    });
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
              defaultValue={account.balance._amount}
            />
            <Typography variant="info" size="small">
              An adjustment transaction will be created automatically if you change this amount.
            </Typography>
          </div>
        </div>
        <div className={styles.edit_account_modal_footer_buttons}>
          <ButtonFilled type="submit" className={styles.edit_account_modal_footer_save_button}>
            Save
          </ButtonFilled>
        </div>
      </div>
    </form>
  );
}
