import { component$, useOnDocument, $, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import Input from '~/components/atom/Input/Input';

function useAccessorKey(input: undefined | HTMLInputElement) {
  useOnDocument(
    'keyup',
    $(event => {
      const keyboardEvent = event as KeyboardEvent;
      if (!keyboardEvent.altKey) return;
      if (keyboardEvent.key !== 'k') return;

      keyboardEvent.preventDefault();
      console.log(input);
      input?.focus();
    }),
  );
}

export default component$(() => {
  const input = useSignal<HTMLInputElement>();
  useOnDocument(
    'keyup',
    $(event => {
      const keyboardEvent = event as KeyboardEvent;
      if (!keyboardEvent.ctrlKey) return;
      if (keyboardEvent.key !== 'k') return;

      keyboardEvent.preventDefault();
      input.value?.focus();
    }),
  );

  return (
    <div class="p-3">
      <Input ref={input} />
    </div>
  );
});
