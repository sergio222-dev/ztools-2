import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { SubCategoryDeleteBatchCommand } from '@budget/subCategory/application/useCase/deleteBatch/SubCategoryDeleteBatch.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SubCategoryDeleteBatchCommand)
export class SubCategoryDeleteBatchHandler implements ICommandHandler<SubCategoryDeleteBatchCommand> {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  async execute(command: SubCategoryDeleteBatchCommand): Promise<void> {
    const { ids } = command;
    await this.subCategoryService.deleteBatch(ids);
  }
}
