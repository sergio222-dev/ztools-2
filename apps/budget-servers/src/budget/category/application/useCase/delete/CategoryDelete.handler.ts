import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CategoryService } from '@budget/category/application/service/Category.service';
import { CategoryDeleteCommand } from '@budget/category/application/useCase/delete/CategoryDelete.command';

@CommandHandler(CategoryDeleteCommand)
export class CategoryDeleteHandler implements ICommandHandler<CategoryDeleteCommand> {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: CategoryDeleteCommand): Promise<void> {
    await this.categoryService.delete(command.id);
  }
}
