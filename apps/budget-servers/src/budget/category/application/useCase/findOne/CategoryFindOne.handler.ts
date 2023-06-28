import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CategoryService } from '@budget/category/application/service/Category.service';
import { CategoryFindOneQuery } from '@budget/category/application/useCase/findOne/CategoryFindOne.query';
import { Category } from '@budget/category/domain/Category.aggregate';

@QueryHandler(CategoryFindOneQuery)
export class CategoryFindOneHandler implements IQueryHandler<CategoryFindOneQuery> {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(query: CategoryFindOneQuery): Promise<Category> {
    return await this.categoryService.findOneById(query.id);
  }
}
