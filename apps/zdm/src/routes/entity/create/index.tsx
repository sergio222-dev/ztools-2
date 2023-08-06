import { $, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import type { IFormEntityCreate } from '~/components/form/entityCreate';
import { FormEntityCreate } from '~/components/form/entityCreate';

export const useEntityCreateFormLoader = routeLoader$<InitialValues<IFormEntityCreate>>(() => ({
  name: '',
  description: '',
  entityParent: '',
}));

export default component$(() => {
  return (
    <div>
      Probando XD
      <FormEntityCreate />
    </div>
  );
});
