import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@zdm/entity/domain/Entity.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntitySchema,
  EntitySchemaType,
  mapToSchema,
} from '@zdm/entity/infrastructure/pg/Entity.schema';
import { Repository } from 'typeorm';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';

@Injectable()
export class PgEntityRepository implements EntityRepository {
  constructor(
    @InjectRepository(EntitySchema)
    private readonly repository: Repository<EntitySchemaType>,
  ) {}

  async save(entity: Entity): Promise<void> {
    const schema = mapToSchema(entity);
    await this.repository.save(schema);
  }
}
