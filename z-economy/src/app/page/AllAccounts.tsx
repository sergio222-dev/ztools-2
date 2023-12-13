import { AllAccountsPage } from '@organisms/AllAccountsPage/AllAccountsPage.view';
import styles from '../templates/main_layout.module.scss';
import { useRef } from 'react';

export const AllAccounts = () => {
  return (
    <div className={styles.z_table} id="all-accounts-page-container">
      <AllAccountsPage />
    </div>
  );
};
