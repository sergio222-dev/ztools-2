import { Inject, Injectable } from '@nestjs/common';
import { EntityRepository } from '@zdm/entity/domain/Entity.repository';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { StringValueObject } from '@shared/domain/valueObject/StringValueObject';
import { StringUndefinedValueObject } from '@shared/domain/valueObject/StringUndefinedValueObject';
import { DateValueObject } from '@shared/domain/valueObject/DateValueObject';
import { NumberValueObject } from '@shared/domain/valueObject/NumberValueObject';

@Injectable()
export class CreateEntity {
  constructor(
    @Inject('EntityRepository')
    private readonly entityRepository: EntityRepository,
  ) {}

  async execute(
    id: string,
    name: string,
    user_id: string,
    description?: string,
    parent_id?: string,
  ) {
    const userId = new IdObject(user_id);
    const lastOrder = await (parent_id
      ? this.entityRepository.getLastEntityOrderValue(
          userId,
          new IdObject(parent_id),
        )
      : this.entityRepository.getLastEntityOrderValue(userId));

    const entity = Entity.CREATE(
      new IdObject(id),
      new StringValueObject(name),
      new NumberValueObject(lastOrder + 1),
      new StringUndefinedValueObject(description),
      new StringUndefinedValueObject(parent_id),
      userId,
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
    );
    return await this.entityRepository.save(entity);
  }
}
