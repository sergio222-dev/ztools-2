import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CategoryService } from '@budget/category/application/service/Category.service';
import { CategoryCreateCommand } from '@budget/category/application/useCase/create/CategoryCreate.command';
import { Category } from '@budget/category/domain/Category.aggregate';

@CommandHandler(CategoryCreateCommand)
export class CategoryCreateHandler implements ICommandHandler<CategoryCreateCommand> {
    constructor(private readonly categoryService: CategoryService) {}
    async execute(command: CategoryCreateCommand): Promise<void> {
        const category = Category.CREATE(command.id, command.name, command.userId, new Date(), new Date());
        void (await this.categoryService.createOne(category));
    }
}
