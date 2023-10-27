import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MonthlyBudgetService } from '@budget/monthlyBudget/application/service/MonthlyBudget.service';
import { MonthlyBudgetDeleteAllBySubCategoryIdCommand } from '@budget/monthlyBudget/application/useCase/delete/MonthlyBudgetDeleteAllBySubCategoryId.command';

@CommandHandler(MonthlyBudgetDeleteAllBySubCategoryIdCommand)
export class MonthlyBudgetDeleteAllBySubCategoryIdHandler
    implements ICommandHandler<MonthlyBudgetDeleteAllBySubCategoryIdCommand>
{
    constructor(private readonly monthlyBudgetService: MonthlyBudgetService) {}

    async execute(command: MonthlyBudgetDeleteAllBySubCategoryIdCommand): Promise<void> {
        await this.monthlyBudgetService.deleteBySubCategoryId(command.subCategoryId, command.userId);
    }
}
