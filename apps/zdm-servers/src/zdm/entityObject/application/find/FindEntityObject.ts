import { Inject } from '@nestjs/common';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { EntityObjectRepository } from '@zdm/entityObject/domain/EntityObject.repository';

export class FindEntityObject {
  constructor(
    @Inject('EntityObjectRepository')
    private readonly repository: EntityObjectRepository,
  ) {}

  async execute(id: IdObject) {
    const result = await this.repository.find(id);

    if (!result) {
      // TODO domain exception
      throw new Error('Entity Object not found');
    }

    return result;
  }
}
