import { SideBar, AllAccountsPage } from '../components/organisms';
import styles from '../templates/main_layout.module.scss';
import { TransactionTable } from '../components/molecules/TransactionTable/TransactionTable';

export const Home = () => {
  return (
    <div className={styles.z_main_layout}>
      <SideBar />
      <AllAccountsPage />
      <div className={styles.z_table}>
        <TransactionTable />
      </div>
    </div>
  );
};
