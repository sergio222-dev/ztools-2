import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="list-group max-w-[200px]">
      <Slot />
    </div>
  );
});
