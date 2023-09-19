import { component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { container } from '~/lib/main.module';

export const useEntityViewLoader = routeLoader$(async ({ params, redirect }) => {
  if (!params.id) {
    throw redirect(302, '/');
  }

  const fetchEntity = container.resolve('fetchEntity');
  return await fetchEntity.execute(params.id);
});

export default component$(() => {
  const entitySignal = useEntityViewLoader();
  const entity = entitySignal.value;

  return (
    <div class="container">
      <div class="col-12 min-h-[200px] min-w-[200px]">
        <div>
          <h1>{entity.name}</h1>
          <span>{entity.description}</span>
        </div>
      </div>
    </div>
  );
});
