import { Entity } from '@zdm/entity/domain/Entity.aggregate';
import { SimpleRepository } from '@shared/domain/aggregate/SimpleRepository';

export interface EntityRepository extends SimpleRepository<Entity> {}
