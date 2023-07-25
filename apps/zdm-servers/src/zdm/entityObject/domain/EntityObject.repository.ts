import { EntityObject } from '@zdm/entityObject/domain/EntityObject.aggregate';
import { SimpleRepository } from '@shared/domain/aggregate/SimpleRepository';

export interface EntityObjectRepository
  extends SimpleRepository<EntityObject> {}
