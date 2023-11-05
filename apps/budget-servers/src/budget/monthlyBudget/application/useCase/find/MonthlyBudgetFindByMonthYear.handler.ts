import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MonthlyBudgetService } from '@budget/monthlyBudget/application/service/MonthlyBudget.service';
import { MonthlyBudgetFindByMonthYearQuery } from '@budget/monthlyBudget/application/useCase/find/MonthlyBudgetFindByMonthYear.query';
import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';

@QueryHandler(MonthlyBudgetFindByMonthYearQuery)
export class MonthlyBudgetFindByMonthYearHandler implements IQueryHandler<MonthlyBudgetFindByMonthYearQuery> {
  constructor(private readonly monthlyBudgetService: MonthlyBudgetService) {}

  async execute(query: MonthlyBudgetFindByMonthYearQuery): Promise<MonthlyBudget[]> {
    return await this.monthlyBudgetService.findAllByMonthYear(query.month, query.year, query.userId);
  }
}
