import { Inject, Injectable } from '@nestjs/common';
import { EntityRepository } from '@zdm/entity/domain/Entity.repository';
import { IdObject } from '@shared/domain/valueObject/IdObject';

@Injectable()
export class FindEntity {
  constructor(
    @Inject('EntityRepository')
    private readonly entityRepository: EntityRepository,
  ) {}

  async execute(id: IdObject) {
    const result = await this.entityRepository.find(id);

    if (!result) {
      // TODO domain exception
      throw new Error('Entity not found');
    }

    return result;
  }
}
