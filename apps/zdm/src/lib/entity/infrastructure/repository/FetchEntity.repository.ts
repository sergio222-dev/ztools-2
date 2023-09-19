import type { EntityRepository } from "~/lib/entity/domain/Entity.repository";
import type { Fetcher } from "~/lib/shared/domain/Fetcher";
import type { EntityAggregate } from "~/lib/entity/domain/Entity.aggregate";
import { ENTITY_ROUTES } from "~/lib/entity/infrastructure/routes";
import { responseToJson } from "~/utils/json";

export class FetchEntityRepository implements EntityRepository {
  public static inject = ['fetcherInstance'] as const;

  constructor(
    private readonly fetcherInstance: Fetcher
  ) {
  }

  async create(entity: EntityAggregate): Promise<void> {
    const route = ENTITY_ROUTES.entity;
    await this.fetcherInstance.fetch(route, {
      method: 'POST',
      body: JSON.stringify(entity),
    });
  }

  async fetch(id: string): Promise<EntityAggregate> {
    const route = `${ENTITY_ROUTES.entity}/${id}`;
    const response = await this.fetcherInstance.fetch(route, {
      method: 'GET',
    });

    if ( !response.ok ) {
      const data = await response.json();
      throw new Error(response.statusText, {cause: data});
    }

    return await responseToJson<EntityAggregate>(response);
  }

  async fetchAll(): Promise<EntityAggregate[]> {
    const route = ENTITY_ROUTES.entity;
    const response = await this.fetcherInstance.fetch(route, {
      method: 'GET',
    });

    if ( !response.ok ) {
      const data = await response.json();
      throw new Error(response.statusText, {cause: data});
    }

    return await responseToJson<EntityAggregate[]>(response);
  }
}
