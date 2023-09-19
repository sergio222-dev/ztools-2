import type { EntityRepository } from "~/lib/entity/domain/Entity.repository";
import type { EntityAggregate } from "~/lib/entity/domain/Entity.aggregate";

export class FetchEntity {
  public static inject = ['entityRepository'] as const;
  
  constructor(private readonly repository: EntityRepository) {}
  
  async execute(id: string): Promise<EntityAggregate> {
    return await this.repository.fetch(id); 
  } 
}
