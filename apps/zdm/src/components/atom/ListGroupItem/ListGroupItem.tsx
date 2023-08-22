import type { HTMLAttributes } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';

interface ListGroupItemProperties extends HTMLAttributes<HTMLDivElement> {}

export default component$(({ ...properties }: ListGroupItemProperties) => {
  return (
    <div {...properties} class="list-group-item list-group-item-action select-none cursor-pointer">
      <Slot />
    </div>
  );
});
