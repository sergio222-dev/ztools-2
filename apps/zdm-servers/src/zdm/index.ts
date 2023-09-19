// Services
import { CreateEntity } from '@zdm/entity/application/create/CreateEntity';
import { CreateEntityObject } from '@zdm/entityObject/application/create/CreateEntityObject';
import { ListEntity } from '@zdm/entity/application/list/ListEntity';
import { FindByUserName } from '@zdm/user/application/findByUserName/FindByUserName';
import { ListEntityObject } from '@zdm/entityObject/application/list/ListEntityObject';
import { DeleteEntity } from '@zdm/entity/application/delete/DeleteEntity';

// Handlers
import { CreateEntityHandler } from '@zdm/entity/application/create/CreateEntity.handler';
import { CreateEntityObjectHandler } from '@zdm/entityObject/application/create/CreateEntityObject.handler';
import { ListEntityHandler } from '@zdm/entity/application/list/ListEntityHandler';
import { FindByUserNameHandler } from '@zdm/user/application/findByUserName/FindByUserName.handler';
import { ListEntityObjectHandler } from '@zdm/entityObject/application/list/ListEntityObjectHandler';
import { DeleteEntityHandler } from '@zdm/entity/application/delete/DeleteEntity.handler';

// Schemas
import { EntitySchema } from './entity/infrastructure/pg/Entity.schema';
import { EntityObjectSchema } from '@zdm/entityObject/infrastructure/pg/EntityObject.schema';
import { UserSchema } from '@zdm/user/infrastructure/pg/User.schema';

// Postgres repositories
import { PgEntityRepository } from '@zdm/entity/infrastructure/repository/PgEntity.repository';
import { PgEntityObjectRepository } from '@zdm/entityObject/infrastructure/repository/PgEntityObject.repository';
import { PgUserRepository } from '@zdm/user/infrastructure/repository/PgUser.repository';
import { FindEntityHandler } from '@zdm/entity/application/find/FindEntity.handler';
import { FindEntity } from '@zdm/entity/application/find/FindEntity';

const zdm = {
  services: [
    CreateEntity,
    CreateEntityObject,
    FindByUserName,
    ListEntity,
    FindEntity,
    ListEntityObject,
    DeleteEntity,
  ],
  handlers: [
    CreateEntityHandler,
    CreateEntityObjectHandler,
    ListEntityHandler,
    FindEntityHandler,
    FindByUserNameHandler,
    ListEntityObjectHandler,
    DeleteEntityHandler,
  ],
  schemas: [EntityObjectSchema, EntitySchema, UserSchema],
  pgRepositories: [
    {
      provide: 'EntityRepository',
      useClass: PgEntityRepository,
    },
    {
      provide: 'EntityObjectRepository',
      useClass: PgEntityObjectRepository,
    },
    {
      provide: 'UserRepository',
      useClass: PgUserRepository,
    },
  ],
};

export default zdm;
