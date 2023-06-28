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
    const monthlyBudgetDocument = await this.monthlyBudgetRepository.findOne(year, month, subCategoryId);

    if (!monthlyBudgetDocument) {
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

    const monthlyBudget = MonthlyBudget.RETRIEVE(
      monthlyBudgetDocument.id,
      monthlyBudgetDocument.month,
      monthlyBudgetDocument.year,
      monthlyBudgetDocument.subCategoryId,
      amount,
      monthlyBudgetDocument.activity,
      monthlyBudgetDocument.available,
      monthlyBudgetDocument.createdAt,
      new Date(),
    );

    await this.monthlyBudgetRepository.update(monthlyBudget);
  }
}
