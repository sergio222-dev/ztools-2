import type { EntityRepository } from "~/lib/entity/domain/Entity.repository";
import type { EntityAggregate } from "~/lib/entity/domain/Entity.aggregate";

export class CreateEntity {
  public static inject = ['entityRepository'] as const;

  constructor(private readonly repository: EntityRepository) {}

  async execute(entity: EntityAggregate) {
    await this.repository.create(entity);
  }
}
