import { Inject } from '@nestjs/common';
import { EntityObjectRepository } from '@zdm/entityObject/domain/EntityObject.repository';
import { EntityObject } from '@zdm/entityObject/domain/EntityObject.aggregate';
import { IdObject } from '@shared/domain/valueObject/IdObject';

export class ListEntityObject {
  constructor(
    @Inject('EntityObjectRepository')
    private readonly repository: EntityObjectRepository,
  ) {}

  async execute(userId: string): Promise<EntityObject[]> {
    return await this.repository.findAll(new IdObject(userId));
  }
}
