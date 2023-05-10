import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoryFindOneQuery } from '@budget/categories/application/useCase/findOne/CategoryFindOne.query';
import { CategoryService } from '@budget/categories/application/service/Category.service';
import { Category } from '@budget/categories/domain/Category.aggregate';

@QueryHandler(CategoryFindOneQuery)
export class CategoryFindOneHandler implements IQueryHandler<CategoryFindOneQuery> {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(query: CategoryFindOneQuery): Promise<Category> {
    return await this.categoryService.findOneById(query.id);
  }
}
