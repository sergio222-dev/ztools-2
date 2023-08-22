import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { InitialValues } from '@modular-forms/qwik';
import type { IFormEntityCreate } from '~/components/form/entityCreate';
import { EntityCreateSchema, FormEntityCreate } from '~/components/form/entityCreate';
import { container } from '~/lib/main.module';
import { formAction$, zodForm$ } from '@modular-forms/qwik';
import type { EntityAggregate } from '~/lib/entity/domain/Entity.aggregate';
import { v4 as uuid } from 'uuid';
import { useEntity } from '~/lib/entity/application/adapters/context';

export const useEntityCreateFormLoader = routeLoader$<InitialValues<IFormEntityCreate>>(() => ({
  name: '',
  description: '',
  entityParent: '',
}));

export const useEntityCreate = formAction$<IFormEntityCreate>(async data => {
  const createEntity = container.resolve('createEntity');
  const newEntity: EntityAggregate = {
    name: data.name,
    id: uuid(),
    ...(data.entityParent !== '' ? { parent_id: data.entityParent } : {}),
    ...(data.description !== '' ? { description: data.description } : {}),
  };

  try {
    await createEntity.execute(newEntity);
    return {
      status: 'success',
    };
  } catch (error: any) {
    return {
      status: 'error',
      message: error.cause.message,
    };
  }
}, zodForm$(EntityCreateSchema));

export default component$(() => {
  const loader = useEntityCreateFormLoader();
  const action = useEntityCreate();
  const { store, getEntities } = useEntity();

  return (
    <div>
      count {store.entities.length}
      <FormEntityCreate
        onSubmitComplete$={getEntities}
        entities={store.entities}
        action={action}
        loader={loader}
      />
    </div>
  );
});
