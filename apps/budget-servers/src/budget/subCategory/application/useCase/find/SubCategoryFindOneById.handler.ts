import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { SubCategoryFindOneByIdQuery } from '@budget/subCategory/application/useCase/find/SubCategoryFindOneById.query';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';

@QueryHandler(SubCategoryFindOneByIdQuery)
export class SubCategoryFindOneByIdHandler
  implements IQueryHandler<SubCategoryFindOneByIdQuery, SubCategory>
{
  constructor(private readonly transactionService: SubCategoryService) {}

  async execute(query: SubCategoryFindOneByIdQuery): Promise<SubCategory> {
    return this.transactionService.findOneById(query.id);
  }
}
