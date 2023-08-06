// Services
import { CreateEntity } from '@zdm/entity/application/create/CreateEntity';
import { CreateEntityObject } from '@zdm/entityObject/application/create/CreateEntityObject';
import { ListEntity } from '@zdm/entity/application/list/ListEntity';
import { SignIn } from '@zdm/user/application/signIn/SignIn';

// Handlers
import { CreateEntityHandler } from '@zdm/entity/application/create/CreateEntity.handler';
import { CreateEntityObjectHandler } from '@zdm/entityObject/application/create/CreateEntityObject.handler';
import { ListEntityHandler } from '@zdm/entity/application/list/ListEntityHandler';
import { SignInHandler } from '@zdm/user/application/signIn/SignIn.handler';

// Schemas
import { EntitySchema } from './entity/infrastructure/pg/Entity.schema';
import { EntityObjectSchema } from '@zdm/entityObject/infrastructure/pg/EntityObject.schema';
import { UserSchema } from '@zdm/user/infrastructure/pg/User.schema';

// Postgres repositories
import { PgEntityRepository } from '@zdm/entity/infrastructure/repository/PgEntity.repository';
import { PgEntityObjectRepository } from '@zdm/entityObject/infrastructure/repository/PgEntityObject.repository';
import { PgUserRepository } from '@zdm/user/infrastructure/repository/PgUser.repository';

const zdm = {
  services: [CreateEntity, CreateEntityObject, SignIn, ListEntity],
  handlers: [
    CreateEntityHandler,
    CreateEntityObjectHandler,
    SignInHandler,
    ListEntityHandler,
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
