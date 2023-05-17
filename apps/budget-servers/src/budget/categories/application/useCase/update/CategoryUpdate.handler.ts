import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryUpdateCommand } from '@budget/categories/application/useCase/update/CategoryUpdate.command';
import { CategoryService } from '@budget/categories/application/service/Category.service';
import { Category } from '@budget/categories/domain/Category.aggregate';

@CommandHandler(CategoryUpdateCommand)
export class CategoryUpdateHandler implements ICommandHandler<CategoryUpdateCommand> {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: CategoryUpdateCommand): Promise<void> {
    const { id, name, assignedBudget, currentBudget } = command;
    const category = Category.CREATE(id, name, assignedBudget, currentBudget);
    void (await this.categoryService.update(category));
  }
}
