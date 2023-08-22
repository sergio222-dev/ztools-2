import type { EntityObjectRepository } from "~/lib/entityObject/domain/EntityObject.repository";
import type { EntityObjectAggregate } from "~/lib/entityObject/domain/EntityObject.aggregate";
import type { Fetcher } from "~/lib/shared/domain/Fetcher";
import { ENTITY_OBJECT_ROUTES } from "~/lib/entityObject/infrastructure/routes";
import { responseToJson } from "~/utils/json";

export class FetchEntityObjectRepository implements EntityObjectRepository {
  public static inject = ["fetcherInstance"] as const;

  constructor(
    private readonly fetcherInstance: Fetcher
  ) {}

  async create(entity: EntityObjectAggregate): Promise<void> {
    const route = ENTITY_OBJECT_ROUTES.entityObject;
    void this.fetcherInstance.fetch(route, {
      method: 'POST',
      body: JSON.stringify(entity),
    });
  }

  async fetchAll(): Promise<EntityObjectAggregate[]> {
    const route = ENTITY_OBJECT_ROUTES.entityObject;
    const response = await this.fetcherInstance.fetch(route, {
      method: 'GET',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(response.statusText, { cause: data });
    }

    return await responseToJson<EntityObjectAggregate[]>(response);
  }
}
