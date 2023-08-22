import { routeLoader$ } from '@builder.io/qwik-city';
import type { InitialValues } from '@modular-forms/qwik';
import type { IFormCreateEntityObject } from '~/components/form/createEntityObject';
import { formAction$, zodForm$ } from '@modular-forms/qwik';
import { container } from '~/lib/main.module';
import { EntityObjectSchema, FormCreateEntityObject } from '~/components/form/createEntityObject';
import type { EntityObjectAggregate } from '~/lib/entityObject/domain/EntityObject.aggregate';
import { v4 as uuid } from 'uuid';
import { component$ } from '@builder.io/qwik';
import { useEntity } from '~/lib/entity/application/adapters/context';

export const useEntityObjectLoader = routeLoader$<InitialValues<IFormCreateEntityObject>>(() => {
  return {
    name: '',
    description: '',
    entity_id: '',
    image_link: '',
    id: '',
  };
});

export const useEntityObjectCreate = formAction$<IFormCreateEntityObject>(async data => {
  const createEntityObject = container.resolve('createEntityObject');
  const newEntityObject: EntityObjectAggregate = {
    entity_id: data.entity_id,
    name: data.name,
    description: data.description,
    image_link: data.image_link,
    id: uuid(),
  };

  try {
    void createEntityObject.execute(newEntityObject);
    return {
      status: 'success',
    };
  } catch (error: any) {
    return {
      status: 'error',
      message: error.cause.message,
    };
  }
}, zodForm$(EntityObjectSchema));

export default component$(() => {
  const loader = useEntityObjectLoader();
  const action = useEntityObjectCreate();
  const { store } = useEntity();

  return (
    <div>
      <FormCreateEntityObject entities={store.entities} action={action} loader={loader} />
    </div>
  );
});
