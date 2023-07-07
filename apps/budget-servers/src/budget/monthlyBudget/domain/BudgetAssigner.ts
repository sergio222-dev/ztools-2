import { v4 as uuid } from 'uuid';

import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { MonthlyBudgetRepository } from '@budget/monthlyBudget/domain/MonthlyBudget.repository';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';

export class BudgetAssigner {
  constructor(private readonly monthlyBudgetRepository: MonthlyBudgetRepository) {}

  async assignBudget(
    amount: UnsignedAmount,
    subCategoryId: string,
    month: string,
    year: string,
  ): Promise<void> {
    const monthlyBudget = await this.monthlyBudgetRepository.findOne(year, month, subCategoryId);

    if (!monthlyBudget) {
      const newMonthlyBudget = MonthlyBudget.CREATE(
        uuid(),
        month,
        year,
        subCategoryId,
        amount,
        new SignedAmount(0),
        new SignedAmount(0),
        new Date(),
        new Date(),
      );

      await this.monthlyBudgetRepository.createOne(newMonthlyBudget);

      return;
    }

    monthlyBudget.setAssigned(amount);

    await this.monthlyBudgetRepository.update(monthlyBudget);
  }
}
