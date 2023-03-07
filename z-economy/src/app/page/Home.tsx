import { SideBar } from '../components/organisms';
import styles from '../templates/main_layout.module.scss';

export const Home = () => {
  return (
    <div className={styles.z_main_layout}>
      <SideBar />
    </div>
  );
};
