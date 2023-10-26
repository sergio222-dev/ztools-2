import styles from '../templates/main_layout.module.scss';
import { ReportsPageView } from '@organisms/ReportsPage/ReportsPage';

export const Reports = () => {
  return (
    <div className={styles.z_table}>
      <ReportsPageView />
    </div>
  );
};
