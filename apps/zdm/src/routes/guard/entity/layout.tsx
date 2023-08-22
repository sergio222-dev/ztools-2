import { component$, Slot } from '@builder.io/qwik';
import { useEntityProvider } from '~/lib/entity/application/adapters/context';

export default component$(() => {
  useEntityProvider();
  return <Slot />;
});
