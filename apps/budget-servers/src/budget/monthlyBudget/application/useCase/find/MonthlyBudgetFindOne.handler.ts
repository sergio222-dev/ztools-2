import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MonthlyBudgetService } from '@budget/monthlyBudget/application/service/MonthlyBudget.service';
import { MonthlyBudgetFindOneQuery } from '@budget/monthlyBudget/application/useCase/find/MonthlyBudgetFindOne.query';
import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';

@QueryHandler(MonthlyBudgetFindOneQuery)
export class MonthlyBudgetFindOneHandler implements IQueryHandler {
    constructor(private readonly monthlyBudgetService: MonthlyBudgetService) {}

    async execute(query: MonthlyBudgetFindOneQuery): Promise<MonthlyBudget | undefined> {
        return await this.monthlyBudgetService.getCurrentMonthlyBudget(
            query.year,
            query.month,
            query.subCategoryId,
            query.userId,
        );
    }
}
