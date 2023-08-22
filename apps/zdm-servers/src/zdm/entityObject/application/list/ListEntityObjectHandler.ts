import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListEntityObjectQuery } from '@zdm/entityObject/application/list/ListEntityObject.query';
import { EntityObject } from '@zdm/entityObject/domain/EntityObject.aggregate';
import { ListEntityObject } from '@zdm/entityObject/application/list/ListEntityObject';

@QueryHandler(ListEntityObjectQuery)
export class ListEntityObjectHandler
  implements IQueryHandler<ListEntityObjectQuery, EntityObject[]>
{
  constructor(private readonly service: ListEntityObject) {}

  async execute(query: ListEntityObjectQuery): Promise<EntityObject[]> {
    return await this.service.execute(query.userId);
  }
}
