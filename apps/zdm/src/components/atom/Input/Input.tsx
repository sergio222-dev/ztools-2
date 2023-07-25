import type { HTMLAttributes } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

interface InputProperties extends HTMLAttributes<HTMLInputElement> {}

export default component$((properties: Omit<InputProperties, 'children'>) => {
  return <input {...properties} type="text" class="form-control" />;
});
