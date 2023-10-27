import { v4 as uuid } from 'uuid';

import { FindOneMonthlyBudget } from '@budget/monthlyBudget/domain/criteria/FindOneMonthlyBudget';
import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { MonthlyBudgetRepository } from '@budget/monthlyBudget/domain/MonthlyBudget.repository';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';

export class BudgetAssigner {
    constructor(private readonly monthlyBudgetRepository: MonthlyBudgetRepository) {}

    async assignBudget(
        amount: UnsignedAmount,
        subCategoryId: string,
        month: string,
        year: string,
        userId: string,
    ): Promise<void> {
        const byOne = FindOneMonthlyBudget.fromValues(subCategoryId, month, year);
        const byUser = FilterByUser.fromValue(userId);
        byOne.push(byUser);
        const filters = new Filters(byOne);
        const criteria = new Criteria(filters, Order.fromValues(), 0, 0);
        const monthlyBudgets = await this.monthlyBudgetRepository.matching(criteria);

        const monthlyBudget =
            monthlyBudgets.length === 0
                ? MonthlyBudget.CREATE(
                      uuid(),
                      month,
                      year,
                      subCategoryId,
                      amount,
                      new SignedAmount(0),
                      new SignedAmount(0),
                      userId,
                      new Date(),
                      new Date(),
                  )
                : monthlyBudgets[0];

        monthlyBudget.setAssigned(amount);

        await this.monthlyBudgetRepository.save(monthlyBudget);
    }
}
