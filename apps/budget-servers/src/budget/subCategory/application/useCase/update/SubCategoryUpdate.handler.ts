import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { SubCategoryUpdateCommand } from '@budget/subCategory/application/useCase/update/SubCategoryUpdate.command';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
@CommandHandler(SubCategoryUpdateCommand)
export class SubCategoryUpdateHandler implements ICommandHandler<SubCategoryUpdateCommand> {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  async execute(command: SubCategoryUpdateCommand): Promise<void> {
    const subCategory = SubCategory.CREATE(
      command.id,
      command.name,
      command.userId,
      command.categoryId,
      new Date(),
      new Date(),
    );
    void (await this.subCategoryService.update(subCategory));
  }
}
