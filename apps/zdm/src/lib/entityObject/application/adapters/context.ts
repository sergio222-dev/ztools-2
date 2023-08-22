import type { EntityObjectAggregate } from "~/lib/entityObject/domain/EntityObject.aggregate";
import { createContextId, QRL } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { container } from "~/lib/main.module";

export interface EntityObjectStore {
  entitiesObjects: EntityObjectAggregate[];
}

interface EntityObjectContext {
  store: EntityObjectStore;
  getEntitiesObjects: QRL<() => void>;
}

export const EntityObjectContext = createContextId<EntityObjectContext>('ZDM.entityObject');

export const fetchAllEntityObjectServer = server$(async () => {
  const fetchAll = container.resolve('')
})
