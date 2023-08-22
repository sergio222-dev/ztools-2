import { EntityObject } from '@zdm/entityObject/domain/EntityObject.aggregate';
import {
  EntityObjectSchema,
  EntityObjectSchemaType,
  mapToSchema,
  mapToAggregate,
} from '@zdm/entityObject/infrastructure/pg/EntityObject.schema';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { PgBaseRepositoryRepository } from '@shared/infrastructure/pg/PgBaseRepository.repository';

export class PgEntityObjectRepository extends PgBaseRepositoryRepository<
  EntityObject,
  EntityObjectSchemaType
> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource, EntityObjectSchema, mapToAggregate, mapToSchema);
  }
}
