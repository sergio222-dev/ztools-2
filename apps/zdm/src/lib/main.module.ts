import { createInjector, Scope } from "typed-inject";
import { SignIn } from "~/lib/user/application/signIn";
import { FetchUserRepository } from "~/lib/user/infrastructure/repository/FetchUser.repository";
import { FetchInstance } from "~/lib/shared/infrastructure/fetch/fetchInstance";
import { FetchAllEntity } from "~/lib/entity/application/fetchAllEntity";
import { FetchEntityRepository } from "~/lib/entity/infrastructure/repository/FetchEntity.repository";
import { CreateEntity } from "~/lib/entity/application/createEntity";
import { FetchEntityObjectRepository } from "~/lib/entityObject/infrastructure/repository/FetchEntityObject.repository";
import { CreateEntityObject } from "~/lib/entityObject/application/createEntityObject";


const buildContainer = () => {
  return createInjector()
    // instance
    .provideClass('fetcherInstance', FetchInstance, Scope.Singleton)
    // repositories
    .provideClass('userRepository', FetchUserRepository)
    .provideClass('entityRepository', FetchEntityRepository)
    .provideClass('entityObjectRepository', FetchEntityObjectRepository)
    // services
    .provideClass('signIn', SignIn)
    .provideClass('fetchAllEntity', FetchAllEntity)
    .provideClass('createEntity', CreateEntity)
    .provideClass('createEntityObject', CreateEntityObject)
}

const container = buildContainer();

export { container };
