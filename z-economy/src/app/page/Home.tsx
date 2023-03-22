import styles from '@templates/main_layout.module.scss';
import { BudgetPageView } from '@organisms/BudgetPage/BudgetPage.view';

export const Home = () => {
  return (
    <div className={styles.z_table}>
      <BudgetPageView />
    </div>
  );
};
