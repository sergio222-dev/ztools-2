import { FC, PropsWithChildren } from 'react';
import styles from '../templates/main_layout.module.scss';
import { SideBarView } from '../components/organisms';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.z_main_layout}>
      <SideBarView />
      {children}
    </div>
  );
};
