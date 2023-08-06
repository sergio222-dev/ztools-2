import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListEntity } from '@zdm/entity/application/list/ListEntity';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';
import { ListEntityQuery } from '@zdm/entity/application/list/ListEntity.query';

@QueryHandler(ListEntityQuery)
export class ListEntityHandler
  implements IQueryHandler<ListEntityQuery, Entity[]>
{
  constructor(private readonly service: ListEntity) {}

  async execute(): Promise<Entity[]> {
    return await this.service.execute();
  }
}
