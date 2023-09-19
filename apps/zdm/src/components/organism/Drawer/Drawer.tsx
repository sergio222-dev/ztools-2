import { component$, Slot } from '@builder.io/qwik';
import { useApp } from '~/lib/shared/application/AppContext';
import styles from './Drawer.module.scss';

export default component$(() => {
  const appStore = useApp();
  const { store } = appStore;
  const { isDrawerOpen } = store;

  return (
    <div class={`${styles['drawer-container']} ${isDrawerOpen ? '' : styles['collapse']}`}>
      <div class={styles['drawer-item']}>
        <Slot />
      </div>
    </div>
  );
});
