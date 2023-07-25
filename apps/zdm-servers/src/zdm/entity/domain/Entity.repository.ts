import { Entity } from '@zdm/entity/domain/Entity.aggregate';

export interface EntityRepository {
  save(entity: Entity): Promise<void>;
}
