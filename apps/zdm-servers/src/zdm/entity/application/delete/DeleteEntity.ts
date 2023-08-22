import { Inject, Injectable } from '@nestjs/common';
import { EntityRepository } from '@zdm/entity/domain/Entity.repository';
import { IdObject } from '@shared/domain/valueObject/IdObject';

@Injectable()
export class DeleteEntity {
  constructor(
    @Inject('EntityRepository')
    private readonly entityRepository: EntityRepository,
  ) {}

  async execute(id: string, userid: string) {
    await this.entityRepository.deleteEntity(
      new IdObject(id),
      new IdObject(userid),
    );
  }
}
