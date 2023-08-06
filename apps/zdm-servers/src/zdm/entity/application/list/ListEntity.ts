import { EntityRepository } from '@zdm/entity/domain/Entity.repository';
import { Inject } from '@nestjs/common';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';

export class ListEntity {
  constructor(
    @Inject('EntityRepository')
    private readonly repository: EntityRepository,
  ) {}

  async execute(): Promise<Entity[]> {
    return await this.repository.findAll();
  }
}
