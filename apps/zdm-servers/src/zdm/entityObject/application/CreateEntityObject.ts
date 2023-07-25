import { Inject, Injectable } from '@nestjs/common';
import { EntityObjectRepository } from '@zdm/entityObject/domain/EntityObject.repository';
import { EntityObject } from '@zdm/entityObject/domain/EntityObject.aggregate';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '@shared/domain/valueObject/StringUndefinedValueObject';

@Injectable()
export class CreateEntityObject {
  constructor(
    @Inject('EntityObjectRepository')
    private readonly entityObjectRepository: EntityObjectRepository,
  ) {}

  async execute(
    id: string,
    name: string,
    entity_id: string,
    description?: string,
    image_link?: string,
  ) {
    const entity = EntityObject.CREATE(
      new IdObject(id),
      new StringValueObject(name),
      new StringValueObject(entity_id),
      new StringUndefinedValueObject(description),
      new StringUndefinedValueObject(image_link),
    );
    return await this.entityObjectRepository.save(entity);
  }
}
