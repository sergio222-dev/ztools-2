import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { SubCategoryCreateCommand } from '@budget/subCategory/application/useCase/create/SubCategoryCreate.command';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';

@CommandHandler(SubCategoryCreateCommand)
export class SubCategoryCreateHandler implements ICommandHandler<SubCategoryCreateCommand> {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  async execute(command: SubCategoryCreateCommand): Promise<void> {
    const subCategory = SubCategory.CREATE(
      command.id,
      command.name,
      command.categoryId,
      new Date(),
      new Date(),
    );
    await this.subCategoryService.create(subCategory);
  }
}
