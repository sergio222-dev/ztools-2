import { component$, Slot } from '@builder.io/qwik';
import { cls } from '~/utils/cls';
import type { ComponentProps } from '~/utils/types/components';

interface ButtonProperties extends ComponentProps<'button'> {}
export default component$<ButtonProperties>(({ class: classList, loading, ...props }) => {
  return (
    <button {...props} class={['btn', ...cls(classList), loading && 'placeholder']}>
      <Slot />
    </button>
  );
});
