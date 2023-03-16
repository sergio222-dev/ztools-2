import { SideBarView, AllAccountsPage } from '../components/organisms';
import styles from '../templates/main_layout.module.scss';

export const Home = () => {
  return (
    <div className={styles.z_main_layout}>
      <SideBarView />
      <div className={styles.z_table}>
        <AllAccountsPage />
      </div>
      {/*<div className={styles.z_table}>*/}
      {/*  <TransactionTable />*/}
      {/*</div>*/}
    </div>
  );
};
