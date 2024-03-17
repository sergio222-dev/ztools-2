import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { SubCategoryFindAllQuery } from '@budget/subCategory/application/useCase/find/SubCategoryFindAll.query';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';

@QueryHandler(SubCategoryFindAllQuery)
export class SubCategoryFindAllHandler implements IQueryHandler<SubCategoryFindAllQuery> {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  async execute(query: SubCategoryFindAllQuery): Promise<SubCategory[]> {
    return await this.subCategoryService.findAll(query.userId);
  }
}
