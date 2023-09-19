import type { EntityAggregate } from "~/lib/entity/domain/Entity.aggregate";

export interface EntityRepository {
  fetchAll(): Promise<EntityAggregate[]>;
  fetch(id: string): Promise<EntityAggregate>;
  create(entity: EntityAggregate): Promise<void>;
}
