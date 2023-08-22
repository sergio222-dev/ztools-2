import { component$ } from '@builder.io/qwik';
import { cls } from '~/utils/cls';
import type { ComponentProps } from '~/utils/types/components';

interface InputProperties extends ComponentProps<'input'> {}

export default component$<InputProperties>(properties => {
  return (
    <input
      {...properties}
      class={['form-control', ...cls(properties.class), properties.loading && 'placeholder']}
    />
  );
});
