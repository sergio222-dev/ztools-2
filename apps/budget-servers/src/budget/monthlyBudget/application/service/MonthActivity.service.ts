import { Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { FindOneMonthlyBudget } from '@budget/monthlyBudget/domain/criteria/FindOneMonthlyBudget';
import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { MonthlyBudgetRepository } from '@budget/monthlyBudget/domain/MonthlyBudget.repository';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';

export class MonthActivityService {
  constructor(
    @Inject('MonthlyBudgetRepository')
    private readonly monthlyBudgetRepository: MonthlyBudgetRepository,
  ) {}

  async findOne(subCategoryId: string, month: string, year: string, userId: string): Promise<MonthlyBudget> {
    const filtersArray = FindOneMonthlyBudget.fromValues(subCategoryId, month, year);
    filtersArray.push(FilterByUser.fromValue(userId));
    const filters = new Filters(filtersArray);
    const criteria = new Criteria(filters, Order.fromValues(), 0, 0);

    const result = await this.monthlyBudgetRepository.matching(criteria);

    if (result.length === 0) {
      return MonthlyBudget.RETRIEVE(
        '',
        month,
        year,
        subCategoryId,
        false,
        new UnsignedAmount(0),
        new UnsignedAmount(0),
        new UnsignedAmount(0),
        userId,
        new Date(),
        new Date(),
      );
    }

    return result[0];
  }

  async decrementActivity(amount: SignedAmount, subCategoryId: string, date: string, userId: string) {
    const month = this.getMonth(date);
    const year = this.getYear(date);

    const result = await this.findOne(subCategoryId, month, year, userId);

    let monthlyBudget: MonthlyBudget;

    if (result.id === '') {
      monthlyBudget = MonthlyBudget.CREATE(
        uuidv4(),
        month,
        year,
        subCategoryId,
        false,
        new UnsignedAmount(0),
        new SignedAmount(0),
        new SignedAmount(0),
        userId,
        new Date(),
        new Date(),
      );

      await this.monthlyBudgetRepository.save(monthlyBudget);
    } else {
      monthlyBudget = result;
    }

    monthlyBudget.decrementActivity(amount);

    await this.monthlyBudgetRepository.save(monthlyBudget);
  }

  async incrementActivity(amount: UnsignedAmount, subCategoryId: string, date: string, userId: string) {
    const month = this.getMonth(date);
    const year = this.getYear(date);

    const result = await this.findOne(subCategoryId, month, year, userId);

    let monthlyBudget: MonthlyBudget;

    if (result.id === '') {
      monthlyBudget = MonthlyBudget.CREATE(
        uuidv4(),
        month,
        year,
        subCategoryId,
        false,
        new UnsignedAmount(0),
        new UnsignedAmount(0),
        new SignedAmount(0),
        userId,
        new Date(),
        new Date(),
      );

      await this.monthlyBudgetRepository.save(monthlyBudget);
    } else {
      monthlyBudget = result;
    }

    monthlyBudget.incrementActivity(amount);

    await this.monthlyBudgetRepository.save(monthlyBudget);
  }

  async moveActivity(
    fromSubCategoryId: string,
    toSubCategoryId: string,
    fromDate: string,
    toDate: string,
    amountToMove: SignedAmount,
    userId: string,
  ) {
    const fromMonth = this.getMonth(fromDate);
    const fromYear = this.getYear(fromDate);

    const toMonth = this.getMonth(toDate);
    const toYear = this.getYear(toDate);

    // const monthlyBudget = await this.monthlyBudgetRepository.findOne(fromYear, fromMonth, fromSubCategoryId);
    const monthlyBudget = await this.findOne(fromSubCategoryId, fromMonth, fromYear, userId);

    if (monthlyBudget.id !== '') {
      if (amountToMove.isPositive()) {
        monthlyBudget.decrementActivity(amountToMove);
      } else {
        monthlyBudget.incrementActivity(amountToMove.negated());
      }

      await this.monthlyBudgetRepository.save(monthlyBudget);
    }

    let newMonthlyBudget = await this.findOne(toSubCategoryId, toMonth, toYear, userId);

    if (newMonthlyBudget.id === '') {
      newMonthlyBudget = MonthlyBudget.CREATE(
        uuidv4(),
        toMonth,
        toYear,
        toSubCategoryId,
        false,
        new UnsignedAmount(0),
        new SignedAmount(0),
        new SignedAmount(0),
        userId,
        new Date(),
        new Date(),
      );

      await this.monthlyBudgetRepository.save(newMonthlyBudget);
    }

    if (amountToMove.isPositive()) {
      newMonthlyBudget.incrementActivity(amountToMove);
    } else {
      newMonthlyBudget.decrementActivity(amountToMove.negated());
    }

    await this.monthlyBudgetRepository.save(newMonthlyBudget);
  }

  private getMonth(date: string): string {
    return (new Date(date).getMonth() + 1).toString().padStart(2, '0');
  }

  private getYear(date: string): string {
    return new Date(date).getFullYear().toString().padStart(4, '0');
  }
}
