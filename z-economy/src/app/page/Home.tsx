import { AllAccountsPage } from '@organisms/AllAccountsPage/AllAccountsPage.view';
import styles from '@templates/main_layout.module.scss';
import { BudgetPage } from '@organisms/BudgetPage/BudgetPage';

export const Home = () => {
  return (
    <div className={styles.z_table}>
      {/*<AllAccountsPage />*/}
      <BudgetPage />
    </div>
  );
};
