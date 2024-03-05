import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { GetSubCategorySystemIdQuery } from '@budget/subCategory/application/useCase/bootstrap/GetSubCategorySystemId.query';

@QueryHandler(GetSubCategorySystemIdQuery)
export class GetSubCategorySystemIdHandler implements IQueryHandler<GetSubCategorySystemIdQuery> {
  constructor(private readonly service: SubCategoryService) {}

  async execute(query: GetSubCategorySystemIdQuery): Promise<string | null> {
    return this.service.getSystemSubCategoryId(query.userId);
  }
}
