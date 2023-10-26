import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CategoryService } from '@budget/category/application/service/Category.service';
import { CategoryFindAllQuery } from '@budget/category/application/useCase/find/CategoryFindAll.query';
import { Category } from '@budget/category/domain/Category.aggregate';

@QueryHandler(CategoryFindAllQuery)
export class CategoryFindAllHandler implements IQueryHandler<CategoryFindAllQuery> {
    constructor(private readonly categoryService: CategoryService) {}

    async execute(query: CategoryFindAllQuery): Promise<Category[]> {
        return await this.categoryService.findAll(query.userId);
    }
}
