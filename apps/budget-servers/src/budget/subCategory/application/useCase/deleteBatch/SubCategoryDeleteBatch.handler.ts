import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { SubCategoryDeleteBatchCommand } from '@budget/subCategory/application/useCase/deleteBatch/SubCategoryDeleteBatch.command';

@CommandHandler(SubCategoryDeleteBatchCommand)
export class SubCategoryDeleteBatchHandler implements ICommandHandler<SubCategoryDeleteBatchCommand> {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  async execute(command: SubCategoryDeleteBatchCommand): Promise<void> {
    // const { ids, userId } = command;
    // await this.subCategoryService.deleteBatch(ids, userId);
  }
}
