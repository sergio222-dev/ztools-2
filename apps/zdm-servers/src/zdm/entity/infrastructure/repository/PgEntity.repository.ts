import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  EntitySchema,
  EntitySchemaType,
  mapToAggregate,
  mapToSchema,
} from '@zdm/entity/infrastructure/pg/Entity.schema';
import { DataSource, MoreThan } from 'typeorm';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';
import { PgBaseRepositoryRepository } from '@shared/infrastructure/pg/PgBaseRepository.repository';
import { EntityRepository } from '@zdm/entity/domain/Entity.repository';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { IdObject } from '@shared/domain/valueObject/IdObject';

@Injectable()
export class PgEntityRepository
  extends PgBaseRepositoryRepository<Entity, EntitySchemaType>
  implements EntityRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource, EntitySchema, mapToAggregate, mapToSchema);
  }

  async deleteEntity(id: IdObject, userid: IdObject): Promise<void> {
    await this.datasource.transaction(async (entityManager) => {
      const entity = await entityManager.findOneBy(EntitySchema, {
        id: id.value,
        user_id: userid.value,
      });

      if (!entity) {
        throw new Error('Entity not found');
      }

      const nextEntities = await entityManager.findBy(EntitySchema, {
        order: MoreThan(entity.order),
        parent_id: entity.parent_id,
      });

      for (const nextEntity of nextEntities) {
        await entityManager.update(
          EntitySchema,
          {
            id: nextEntity.id,
          },
          {
            order: nextEntity.order - 1,
          },
        );
      }

      await entityManager.remove(EntitySchema, entity);
    });
  }

  async getLastEntityOrderValue(
    userId: StringValueObject,
    parentId?: StringValueObject,
  ): Promise<number> {
    const entity = await this.repository.findOne({
      where: {
        user_id: userId.value,
        parent_id: parentId?.value ?? undefined,
      },
      order: {
        order: 'DESC',
      },
    });

    return entity?.order ?? -1;
  }
}
