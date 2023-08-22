import type { EntityObjectAggregate } from "~/lib/entityObject/domain/EntityObject.aggregate";

export interface EntityObjectRepository {
  create(entity: EntityObjectAggregate): Promise<void>;
  fetchAll(): Promise<EntityObjectAggregate[]>;
}
