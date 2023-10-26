import styles from './ReportsPage.module.scss';
import { SpendingPieChart } from '../../charts/SpendingPieChart';

export function ReportsPageView() {
  return (
    <div className={styles.reports_page}>
      <SpendingPieChart />
    </div>
  );
}
