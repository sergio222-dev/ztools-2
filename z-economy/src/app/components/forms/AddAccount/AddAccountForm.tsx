import styles from './AddAccountForm.module.scss';
import { Input } from '@atoms/Input/Input';
import { ButtonFilled } from '@atoms/Button/ButtonFilled';
import { Signal } from '@preact/signals-react';
import { Typography } from '@atoms/Typography/Typography';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import { useAccountHook } from '@core/budget/account/application/adapter/useAccount.hook';
import { v4 as uuidv4 } from 'uuid';
import { IconButton } from '@atoms/Button/IconButton';
import { RxCross2 } from 'react-icons/rx';
import cls from 'classnames';

interface AddAccountFormProperties {
  isOpen: Signal<boolean>;
}
export function AddAccountForm({ isOpen }: AddAccountFormProperties) {
  // STATE
  const formReference = useRef(null);
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  //SERVICES
  const { createAccount } = useAccountHook();

  //HANDLERS
  const handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    isOpen.value = false;
    if (formReference.current === null) return;
    const addAccountForm = new FormData(formReference.current);
    const newAccountName = addAccountForm.get('accountName') as string;
    if (newAccountName === '') return;
    void createAccount({
      id: uuidv4(),
      name: newAccountName,
      balance: '',
    });
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
            <div className={styles.add_account_modal_input_header}>
              <Typography variant="bold" size="normal">
                Give it a nickname
              </Typography>
            </div>
            <Input
              name="accountName"
              className={styles.add_account_modal_input}
              onChange={handleAccountNameChange}
            />
          </div>
          {/*// TODO: implement creating a transaction for the account initial balance */}
          <div>
            <div className={styles.add_account_modal_input_header}>
              <Typography variant="bold" size="normal">
                What is your current account balance?
              </Typography>
            </div>
            <Input
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
