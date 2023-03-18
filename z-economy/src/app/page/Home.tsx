import { AllAccountsPage } from '@organisms/AllAccountsPage/AllAccountsPage.view';
import styles from '@templates/main_layout.module.scss';

export const Home = () => {
  return (
    <div className={styles.z_table}>
      <AllAccountsPage />
    </div>
  );
};
