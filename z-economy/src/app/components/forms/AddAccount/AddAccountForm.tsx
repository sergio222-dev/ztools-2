import styles from './AddAccountForm.module.scss';
import { Input } from '@atoms/Input/Input';
import { CancelButton } from '@atoms/Button/CancelButton';
import { SaveButton } from '@atoms/Button/SaveButton';
import { Signal } from '@preact/signals-react';
import { Typography } from '@atoms/Typography/Typography';
import { SyntheticEvent, useRef } from 'react';
import { useAccountHook } from '@core/budget/account/application/adapter/useAccount.hook';
import { v4 as uuidv4 } from 'uuid';

interface AddCategoryFormProperties {
  isOpen: Signal<boolean>;
}
export function AddAccountForm({ isOpen }: AddCategoryFormProperties) {
  // STATE
  const formReference = useRef(null);

  //SERVICES
  const { createAccount } = useAccountHook();
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
    });
  };

  return (
    <form
      name="add-account"
      className={styles.add_account_form}
      ref={formReference}
      onSubmit={handleFormSubmit}
    >
      <div className="z_flex z_flex_jc_center">
        {' '}
        <Typography variant="bold"> Add Account </Typography>{' '}
      </div>
      <Input name="accountName" />
      <div className={styles.modal_form_buttons}>
        <CancelButton type="reset" onClick={() => (isOpen.value = false)} />
        <SaveButton type="submit" />
      </div>
    </form>
  );
}
