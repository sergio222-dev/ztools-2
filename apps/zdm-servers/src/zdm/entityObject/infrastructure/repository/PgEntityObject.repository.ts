import { EntityObject } from '@zdm/entityObject/domain/EntityObject.aggregate';
import {
  EntityObjectSchema,
  EntityObjectSchemaType,
  mapToSchema,
} from '@zdm/entityObject/infrastructure/pg/EntityObject.schema';
import { EntityObjectRepository } from '@zdm/entityObject/domain/EntityObject.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class PgEntityObjectRepository implements EntityObjectRepository {
  constructor(
    @InjectRepository(EntityObjectSchema)
    private readonly repository: Repository<EntityObjectSchemaType>,
  ) {}
  async save(entity: EntityObject): Promise<void> {
    const schema = mapToSchema(entity);
    await this.repository.save(schema);
  }
}
