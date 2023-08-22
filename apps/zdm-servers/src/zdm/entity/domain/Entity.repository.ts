import { Entity } from '@zdm/entity/domain/Entity.aggregate';
import { SimpleRepository } from '@shared/domain/aggregate/SimpleRepository';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { IdObject } from '@shared/domain/valueObject/IdObject';

export interface EntityRepository extends SimpleRepository<Entity> {
  getLastEntityOrderValue(
    userId: StringValueObject,
    parentId?: StringValueObject,
  ): Promise<number>;
  deleteEntity(id: IdObject, userid: IdObject): Promise<void>;
}
