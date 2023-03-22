import { AllAccountsPage } from '../components/organisms/AllAccountsPage/AllAccountsPage.view';
import styles from '../templates/main_layout.module.scss';

export const AllAccounts = () => {
  return (
    <div className={styles.z_table}>
      <AllAccountsPage />
    </div>
  );
};
