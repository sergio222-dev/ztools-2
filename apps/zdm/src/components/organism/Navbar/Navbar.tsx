import { component$ } from '@builder.io/qwik';
import Button from '~/components/atom/Button/Button';
import { useApp } from '~/lib/shared/application/AppContext';
import type { ComponentProps } from '~/utils/types/components';
import styles from './Navbar.module.scss';
import { cls } from '~/utils/cls';

export default component$<ComponentProps<'div'>>(props => {
  const appStore = useApp();
  const { toggleDrawer, store } = appStore;
  const { isDrawerOpen } = store;

  // useVisibleTask$(() => {
  //   window.addEventListener('keypress', (event) => {
  //     if (event.key === "]") {
  //       void toggleDrawer();
  //     }
  //   });
  // })

  return (
    <div {...props} class={[cls(props.class), styles.navbar]}>
      <Button class={['btn-link', styles['toggle-button']]} onClick$={toggleDrawer}>
        {isDrawerOpen ? '<<<' : '>>>'}
      </Button>
    </div>
  );
});
