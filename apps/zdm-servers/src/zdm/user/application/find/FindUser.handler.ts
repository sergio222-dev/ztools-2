import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUser } from '@zdm/user/application/find/FindUser';
import { IdObject } from '@shared/domain/valueObject/IdObject';
import { User } from '@zdm/user/domain/User.aggregate';
import { FindUserQuery } from '@zdm/user/application/find/FindUser.query';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery, User> {
  constructor(private readonly service: FindUser) {}

  async execute(query: FindUserQuery): Promise<User> {
    return await this.service.execute(new IdObject(query.id));
  }
}
