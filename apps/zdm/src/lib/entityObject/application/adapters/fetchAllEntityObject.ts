import type { EntityObjectRepository } from "~/lib/entityObject/domain/EntityObject.repository";

export class FetchAllEntityObject {
  public static inject = ['entityObjectRepository'] as const;

  constructor(private readonly repository: EntityObjectRepository) {}

  async execute(): Promise<void> {
    await this.repository.fetchAll();
  }
}
