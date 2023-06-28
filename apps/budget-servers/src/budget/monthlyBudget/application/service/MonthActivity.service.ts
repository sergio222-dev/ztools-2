import { Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { MonthlyBudgetRepository } from '@budget/monthlyBudget/domain/MonthlyBudget.repository';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';

export class MonthActivityService {
  constructor(
    @Inject('MonthlyBudgetRepository')
    private readonly monthlyBudgetRepository: MonthlyBudgetRepository,
  ) {}

  async decrementActivity(amount: SignedAmount, subCategoryId: string, date: string) {
    const month = this.getMonth(date);
    const year = this.getYear(date);

    let monthlyBudget = await this.monthlyBudgetRepository.findOne(year, month, subCategoryId);

    if (!monthlyBudget) {
      monthlyBudget = MonthlyBudget.CREATE(
        uuidv4(),
        month,
        year,
        subCategoryId,
        new UnsignedAmount(0),
        new UnsignedAmount(0),
        new SignedAmount(0),
        new Date(),
        new Date(),
      );

      await this.monthlyBudgetRepository.createOne(monthlyBudget);
    }

    monthlyBudget.decrementActivity(amount);

    await this.monthlyBudgetRepository.update(monthlyBudget);
  }

  async incrementActivity(amount: UnsignedAmount, subCategoryId: string, date: string) {
    const month = this.getMonth(date);
    const year = this.getYear(date);

    let monthlyBudget = await this.monthlyBudgetRepository.findOne(year, month, subCategoryId);

    if (!monthlyBudget) {
      monthlyBudget = MonthlyBudget.CREATE(
        uuidv4(),
        month,
        year,
        subCategoryId,
        new UnsignedAmount(0),
        new UnsignedAmount(0),
        new SignedAmount(0),
        new Date(),
        new Date(),
      );

      await this.monthlyBudgetRepository.createOne(monthlyBudget);
    }

    monthlyBudget.incrementActivity(amount);

    await this.monthlyBudgetRepository.update(monthlyBudget);
  }

  private getMonth(date: string): string {
    return (new Date(date).getMonth() + 1).toString().padStart(2, '0');
  }

  private getYear(date: string): string {
    return new Date(date).getFullYear().toString().padStart(4, '0');
  }
}
