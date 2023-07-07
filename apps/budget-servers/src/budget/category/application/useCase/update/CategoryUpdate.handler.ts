import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CategoryService } from '@budget/category/application/service/Category.service';
import { CategoryUpdateCommand } from '@budget/category/application/useCase/update/CategoryUpdate.command';
import { Category } from '@budget/category/domain/Category.aggregate';

@CommandHandler(CategoryUpdateCommand)
export class CategoryUpdateHandler implements ICommandHandler<CategoryUpdateCommand> {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: CategoryUpdateCommand): Promise<void> {
    const category = Category.CREATE(command.id, command.name, new Date(), new Date());
    void (await this.categoryService.update(category));
  }
}
