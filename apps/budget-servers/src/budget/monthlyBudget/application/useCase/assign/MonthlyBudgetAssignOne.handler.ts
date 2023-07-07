import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MonthlyBudgetService } from '@budget/monthlyBudget/application/service/MonthlyBudget.service';
import { MonthlyBudgetAssignOneCommand } from '@budget/monthlyBudget/application/useCase/assign/MonthlyBudgetAssignOne.command';

@CommandHandler(MonthlyBudgetAssignOneCommand)
export class MonthlyBudgetAssignOneHandler implements ICommandHandler<MonthlyBudgetAssignOneCommand> {
  constructor(private readonly monthlyBudgetService: MonthlyBudgetService) {}

  async execute(command: MonthlyBudgetAssignOneCommand): Promise<void> {
    await this.monthlyBudgetService.assignBudget(
      command.amount,
      command.subCategoryId,
      command.month,
      command.year,
    );
  }
}
