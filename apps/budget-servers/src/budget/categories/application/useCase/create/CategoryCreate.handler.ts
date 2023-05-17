import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryCreateCommand } from '@budget/categories/application/useCase/create/CategoryCreate.command';
import { CategoryService } from '@budget/categories/application/service/Category.service';
import { Category } from '@budget/categories/domain/Category.aggregate';

@CommandHandler(CategoryCreateCommand)
export class CategoryCreateHandler implements ICommandHandler<CategoryCreateCommand> {
  constructor(private readonly categoryService: CategoryService) {}
  async execute(command: CategoryCreateCommand): Promise<void> {
    const category = Category.CREATE(command.id, command.name, command.assignedBudget, command.currentBudget);
    void (await this.categoryService.createOne(category));
  }
}
