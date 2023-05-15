import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryDeleteCommand } from '@budget/categories/application/useCase/delete/CategoryDelete.command';
import { CategoryService } from '@budget/categories/application/service/Category.service';

@CommandHandler(CategoryDeleteCommand)
export class CategoryDeleteHandler implements ICommandHandler<CategoryDeleteCommand> {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: CategoryDeleteCommand): Promise<void> {
    await this.categoryService.delete(command.id);
  }
}
