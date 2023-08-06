import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  EntitySchema,
  EntitySchemaType,
  mapToAggregate,
  mapToSchema,
} from '@zdm/entity/infrastructure/pg/Entity.schema';
import { DataSource } from 'typeorm';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';
import { PgBaseRepositoryRepository } from '@shared/infrastructure/pg/PgBaseRepository.repository';

@Injectable()
export class PgEntityRepository extends PgBaseRepositoryRepository<
  Entity,
  EntitySchemaType
> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource, EntitySchema, mapToAggregate, mapToSchema);
  }
}
