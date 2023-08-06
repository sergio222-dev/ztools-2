import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { FindEntityObjectQuery } from '@zdm/entityObject/application/find/FindEntityObject.query';
import { EntityObject } from '@zdm/entityObject/domain/EntityObject.aggregate';
import { FindEntityObject } from '@zdm/entityObject/application/find/FindEntityObject';

@QueryHandler(FindEntityObjectQuery)
export class FindEntityObjectHandler
  implements IQueryHandler<FindEntityObjectQuery, EntityObject>
{
  constructor(private readonly service: FindEntityObject) {}

  async execute(query: FindEntityObjectQuery): Promise<EntityObject> {
    return await this.service.execute(new IdObject(query.id));
  }
}
