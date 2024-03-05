import { CategoryService } from '@budget/category/application/service/Category.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetCategorySystemIdQuery } from '@budget/category/application/useCase/bootstrap/GetCategorySystemId.query';

@QueryHandler(GetCategorySystemIdQuery)
export class GetCategorySystemIdHandler implements IQueryHandler<GetCategorySystemIdQuery> {
  constructor(private readonly service: CategoryService) {}

  async execute(query: GetCategorySystemIdQuery): Promise<string> {
    return this.service.getSystemCategoryId(query.userId);
  }
}
