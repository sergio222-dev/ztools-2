import type { QRL} from "@builder.io/qwik";
import { $, createContextId, useContext, useContextProvider, useStore, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import type { EntityAggregate } from "~/lib/entity/domain/Entity.aggregate";
import { container } from "~/lib/main.module";

export interface EntityStore {
  entities: EntityAggregate[];
  isLoading: boolean;
}

interface EntityContext {
  store: EntityStore,
  getEntities: QRL<() => void>
}

export const EntityContext = createContextId<EntityContext>('ZDM.entity');
export const fetchAllEntityServer = server$(async () => {
  const fetchAll = container.resolve('fetchAllEntity');
  return await fetchAll.execute();
});

export const useEntityProvider = () => {
  const store = useStore<EntityStore>({
    entities: [],
    isLoading: false,
  });

  const getEntities = $(async () => {
    store.entities = await fetchAllEntityServer();
  });

  const service = { store, getEntities };
  useContextProvider(EntityContext, service);

  useTask$(async () => {
    store.isLoading = true;
    await getEntities();
    store.isLoading = false;
  });

  return service;
}

export const useEntity = () => useContext(EntityContext);


