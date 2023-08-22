import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindByUserNameQuery } from '@zdm/user/application/findByUserName/FindByUserName.query';
import { FindByUserName } from '@zdm/user/application/findByUserName/FindByUserName';
import { FindByUserNameResponse } from '@zdm/user/application/findByUserName/FindByUserNameResponse';

@QueryHandler(FindByUserNameQuery)
export class FindByUserNameHandler
  implements
    IQueryHandler<FindByUserNameQuery, FindByUserNameResponse | undefined>
{
  constructor(private readonly service: FindByUserName) {}

  async execute(
    query: FindByUserNameQuery,
  ): Promise<FindByUserNameResponse | undefined> {
    const user = await this.service.execute(query.username);
    return user
      ? new FindByUserNameResponse(
          user.id.value,
          user.name.value,
          user.password.value,
        )
      : undefined;
  }
}
