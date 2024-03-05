import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CategoryService } from '@budget/category/application/service/Category.service';
import { CategoryBootstrapCommand } from '@budget/category/application/useCase/bootstrap/CategoryBootstrap.command';

@CommandHandler(CategoryBootstrapCommand)
export class CategoryBootstrapCommandHandler implements ICommandHandler<CategoryBootstrapCommand> {
  constructor(readonly service: CategoryService) {}

  async execute(command: CategoryBootstrapCommand): Promise<void> {
    await this.service.bootstrapUser(command.userId);
  }
}
