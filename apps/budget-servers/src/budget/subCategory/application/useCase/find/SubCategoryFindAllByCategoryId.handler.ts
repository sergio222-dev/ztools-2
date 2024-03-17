import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { SubCategoryFindAllByCategoryIdQuery } from '@budget/subCategory/application/useCase/find/SubCategoryFindAllByCategoryId.query';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';

@QueryHandler(SubCategoryFindAllByCategoryIdQuery)
export class SubCategoryFindAllByCategoryIdHandler
  implements IQueryHandler<SubCategoryFindAllByCategoryIdQuery>
{
  constructor(private readonly subCategoryService: SubCategoryService) {}

  async execute(query: SubCategoryFindAllByCategoryIdQuery): Promise<SubCategory[]> {
    return await this.subCategoryService.findAllByCategoryId(query.categoryId, query.userId);
  }
}
