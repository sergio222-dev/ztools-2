import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';
import { cls } from '~/utils/cls';

type SelectProperties = QwikIntrinsicElements['select'];

export default component$(({ class: classList, ...rest }: Omit<SelectProperties, 'children'>) => {
  return (
    <select {...rest} class={['form-select', ...cls(classList)]}>
      <Slot />
    </select>
  );
});
