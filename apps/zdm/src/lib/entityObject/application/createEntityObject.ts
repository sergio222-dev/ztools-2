import type { EntityObjectRepository } from "~/lib/entityObject/domain/EntityObject.repository";
import type { EntityObjectAggregate } from "~/lib/entityObject/domain/EntityObject.aggregate";

export class CreateEntityObject {
  public static inject = ['entityObjectRepository'] as const; 
  
  constructor(private readonly repository: EntityObjectRepository) {}
  
  async execute(entity: EntityObjectAggregate) {
    await this.repository.create(entity);
  }
}
