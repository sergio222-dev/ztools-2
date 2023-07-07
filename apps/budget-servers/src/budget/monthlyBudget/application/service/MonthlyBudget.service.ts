import { Inject, Injectable } from '@nestjs/common';

import { BudgetAssigner } from '@budget/monthlyBudget/domain/BudgetAssigner';
import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { MonthlyBudgetRepository } from '@budget/monthlyBudget/domain/MonthlyBudget.repository';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';

@Injectable()
export class MonthlyBudgetService {
  private readonly budgetAssigner: BudgetAssigner;

  constructor(
    @Inject('MonthlyBudgetRepository')
    private readonly monthlyBudgetRepository: MonthlyBudgetRepository,
  ) {
    this.budgetAssigner = new BudgetAssigner(monthlyBudgetRepository);
  }

  async assignBudget(amount: string, subCategoryId: string, month: string, year: string): Promise<void> {
    await this.budgetAssigner.assignBudget(new UnsignedAmount(amount), subCategoryId, month, year);
  }

  async findOne(year: string, month: string, subCategoryId: string): Promise<MonthlyBudget | undefined> {
    const monthlyBudgetDocument = await this.monthlyBudgetRepository.findOne(year, month, subCategoryId);

    if (!monthlyBudgetDocument) {
      return undefined;
    }

    return MonthlyBudget.RETRIEVE(
      monthlyBudgetDocument.id,
      monthlyBudgetDocument.month,
      monthlyBudgetDocument.year,
      monthlyBudgetDocument.subCategoryId,
      monthlyBudgetDocument.assigned,
      monthlyBudgetDocument.activity,
      monthlyBudgetDocument.available,
      monthlyBudgetDocument.createdAt,
      monthlyBudgetDocument.updatedAt,
    );
  }

  async getCurrentMonthlyBudget(
    year: string,
    month: string,
    subCategoryId: string,
  ): Promise<MonthlyBudget | undefined> {
    const monthlyBudgetDocument = await this.monthlyBudgetRepository.findOne(year, month, subCategoryId);

    const previousBudgets = await this.monthlyBudgetRepository.findAllAvailableBefore(
      year,
      month,
      subCategoryId,
    );

    let totalAvailable = new UnsignedAmount(0);
    for (const budget of previousBudgets) {
      totalAvailable = totalAvailable.plus(budget.available);
    }

    if (!monthlyBudgetDocument) {
      return MonthlyBudget.RETRIEVE(
        '',
        month,
        year,
        subCategoryId,
        new UnsignedAmount(0),
        new UnsignedAmount(0),
        totalAvailable,
        new Date(),
        new Date(),
      );
    }

    return MonthlyBudget.RETRIEVE(
      monthlyBudgetDocument.id,
      monthlyBudgetDocument.month,
      monthlyBudgetDocument.year,
      monthlyBudgetDocument.subCategoryId,
      monthlyBudgetDocument.assigned,
      monthlyBudgetDocument.activity,
      monthlyBudgetDocument.available.plus(totalAvailable),
      monthlyBudgetDocument.createdAt,
      monthlyBudgetDocument.updatedAt,
    );
  }

  async createOne(monthlyBudget: MonthlyBudget): Promise<void> {
    await this.monthlyBudgetRepository.createOne(monthlyBudget);
  }
}
