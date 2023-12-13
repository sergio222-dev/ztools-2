import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { SubCategoryDeleteCommand } from '@budget/subCategory/application/useCase/delete/SubCategoryDelete.command';

@CommandHandler(SubCategoryDeleteCommand)
export class SubCategoryDeleteHandler implements ICommandHandler<SubCategoryDeleteCommand> {
  constructor(private readonly transactionService: SubCategoryService) {}

  async execute(command: SubCategoryDeleteCommand): Promise<void> {
    const { id } = command;
    await this.transactionService.deleteOneById(id);
  }
}
