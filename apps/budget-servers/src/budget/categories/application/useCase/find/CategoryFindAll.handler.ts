import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoryFindAllQuery } from '@budget/categories/application/useCase/find/CategoryFindAll.query';
import { CategoryService } from '@budget/categories/application/service/Category.service';
import { Category } from '@budget/categories/domain/Category.aggregate';

@QueryHandler(CategoryFindAllQuery)
export class CategoryFindAllHandler implements IQueryHandler<CategoryFindAllQuery> {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }
}
