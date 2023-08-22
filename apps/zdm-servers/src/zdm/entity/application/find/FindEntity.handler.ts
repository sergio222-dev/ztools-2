import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Entity } from '@zdm/entity/domain/Entity.aggregate';
import { FindEntityQuery } from '@zdm/entity/application/find/FindEntity.query';
import { FindEntity } from '@zdm/entity/application/find/FindEntity';
import { IdObject } from '@shared/domain/valueObject/IdObject';

@QueryHandler(FindEntityQuery)
export class FindEntityHandler
  implements IQueryHandler<FindEntityQuery, Entity>
{
  constructor(private readonly service: FindEntity) {}

  async execute(query: FindEntityQuery): Promise<Entity> {
    return await this.service.execute(new IdObject(query.id));
  }
}
