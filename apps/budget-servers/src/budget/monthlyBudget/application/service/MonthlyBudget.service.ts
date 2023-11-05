import { Inject, Injectable } from '@nestjs/common';

import { BudgetAssigner } from '@budget/monthlyBudget/domain/BudgetAssigner';
import { FindOneMonthlyBudget } from '@budget/monthlyBudget/domain/criteria/FindOneMonthlyBudget';
import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { MonthlyBudgetRepository } from '@budget/monthlyBudget/domain/MonthlyBudget.repository';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';

@Injectable()
export class MonthlyBudgetService {
  private readonly budgetAssigner: BudgetAssigner;

  constructor(
    @Inject('MonthlyBudgetRepository')
    private readonly monthlyBudgetRepository: MonthlyBudgetRepository,
  ) {
    this.budgetAssigner = new BudgetAssigner(monthlyBudgetRepository);
  }

  async assignBudget(
    amount: string,
    subCategoryId: string,
    month: string,
    year: string,
    userId: string,
  ): Promise<void> {
    await this.budgetAssigner.assignBudget(new UnsignedAmount(amount), subCategoryId, month, year, userId);
  }

  async findOne(subCategoryId: string, month: string, year: string, userId: string): Promise<MonthlyBudget> {
    const filtersArray = FindOneMonthlyBudget.fromValues(subCategoryId, month, year);
    filtersArray.push(FilterByUser.fromValue(userId));
    const filters = new Filters(filtersArray);
    const criteria = new Criteria(filters, Order.fromValues(), 0, 0);

    const results = await this.monthlyBudgetRepository.matching(criteria);

    if (results.length === 0) {
      return MonthlyBudget.RETRIEVE(
        '',
        month,
        year,
        subCategoryId,
        new UnsignedAmount(0),
        new UnsignedAmount(0),
        new UnsignedAmount(0),
        userId,
        new Date(),
        new Date(),
      );
    }

    return results[0];
  }

  async findAllByMonthYear(month: string, year: string, userId: string): Promise<MonthlyBudget[]> {
    return await this.monthlyBudgetRepository.findAllByMonthYear(month, year, userId);
  }

  async getCurrentMonthlyBudget(
    year: string,
    month: string,
    subCategoryId: string,
    userId: string,
  ): Promise<MonthlyBudget | undefined> {
    const monthlyBudget = await this.findOne(subCategoryId, month, year, userId);

    const previousBudgets = await this.monthlyBudgetRepository.findAllAvailableBefore(
      subCategoryId,
      month,
      year,
      userId,
    );

    let totalAvailable = new UnsignedAmount(0);
    for (const budget of previousBudgets) {
      totalAvailable = totalAvailable.plus(budget.available);
    }

    if (monthlyBudget.id === '') {
      monthlyBudget.setAvailable(totalAvailable);
    } else {
      monthlyBudget.setAvailable(monthlyBudget.available.plus(totalAvailable));
    }

    return monthlyBudget;
  }

  // async createOne(monthlyBudget: MonthlyBudget): Promise<void> {
  //     await this.monthlyBudgetRepository.createOne(monthlyBudget);
  // }

  async deleteBySubCategoryId(subCategoryId: string, userId: string): Promise<void> {
    const monthlyBudget = MonthlyBudget.RETRIEVE(
      '',
      '',
      '',
      subCategoryId,
      new UnsignedAmount(0),
      new UnsignedAmount(0),
      new UnsignedAmount(0),
      userId,
      new Date(),
      new Date(),
    );

    await this.monthlyBudgetRepository.deleteBySubCategoryId(monthlyBudget);
  }
}
