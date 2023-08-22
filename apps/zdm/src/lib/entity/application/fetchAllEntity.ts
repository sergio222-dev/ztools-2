import type { EntityRepository } from "~/lib/entity/domain/Entity.repository";
import type { EntityAggregate } from "~/lib/entity/domain/Entity.aggregate";

export class FetchAllEntity {
  public static inject = ['entityRepository'] as const;

  constructor(private readonly repository: EntityRepository) {}

  async execute(): Promise<EntityAggregate[]> {
    return await this.repository.fetchAll();
  }
}
