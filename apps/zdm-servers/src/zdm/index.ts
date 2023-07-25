// Services
import { CreateEntity } from '@zdm/entity/application/CreateEntity';
import { CreateEntityObject } from '@zdm/entityObject/application/CreateEntityObject';

// Schemas
import { EntitySchema } from './entity/infrastructure/pg/Entity.schema';
import { EntityObjectSchema } from '@zdm/entityObject/infrastructure/pg/EntityObject.schema';

// Postgres repositories
import { PgEntityRepository } from '@zdm/entity/infrastructure/repository/PgEntity.repository';
import { PgEntityObjectRepository } from '@zdm/entityObject/infrastructure/repository/PgEntityObject.repository';

const zdm = {
  services: [CreateEntity, CreateEntityObject],
  handlers: [],
  schemas: [EntitySchema, EntityObjectSchema],
  pgRepositories: [
    {
      provide: 'EntityRepository',
      useClass: PgEntityRepository,
    },
    {
      provide: 'EntityObjectRepository',
      useClass: PgEntityObjectRepository,
    },
  ],
};

export default zdm;
