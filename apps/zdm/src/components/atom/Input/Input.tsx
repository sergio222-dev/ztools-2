import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

type InputProperties = QwikIntrinsicElements['input'];

export default component$((properties: Omit<InputProperties, 'children'>) => {
  return <input {...properties} class="form-control" />;
});
