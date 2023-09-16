import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { MonthlyBudgetRepository } from '@budget/monthlyBudget/domain/MonthlyBudget.repository';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { convertToSimple } from '@shared/infrastructure/mongo/convertToSimple';

@Injectable()
export class MongoMonthlyBudgetRepository implements MonthlyBudgetRepository {
  constructor(
    @InjectModel('MonthlyBudget')
    private readonly monthlyBudgetModel: Model<MonthlyBudget>,
  ) {}

  async findAllAvailableBefore(year: string, month: string, subCategoryId: string): Promise<MonthlyBudget[]> {
    const allDocuments = await this.monthlyBudgetModel.find({
      $expr: {
        $and: [
          {
            $eq: ['$subCategoryId', subCategoryId],
          },
          {
            $or: [
              {
                $lt: ['$year', year],
              },
              {
                $and: [
                  {
                    $eq: ['$year', year],
                  },
                  {
                    $lt: ['$month', month],
                  },
                ],
              },
            ],
          },
          {
            $not: {
              $regexMatch: {
                input: '$available',
                regex: '-',
              },
            },
          },
        ],
      },
    });

    return allDocuments.map(document => {
      return MonthlyBudget.RETRIEVE(
        document.id,
        document.month,
        document.year,
        document.subCategoryId,
        document.assigned,
        document.activity,
        document.available,
        document.createdAt,
        document.updatedAt,
      );
    });
  }

  async findOne(year: string, month: string, subCategoryId: string): Promise<MonthlyBudget | undefined> {
    const monthlyBudgetDocument = await this.monthlyBudgetModel
      .findOne({
        year,
        month,
        subCategoryId,
      })
      .exec();

    if (!monthlyBudgetDocument) {
      // TODO should return empty entity
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

  async createOne(monthlyBudget: MonthlyBudget): Promise<void> {
    const monthlyBudgetSimple = convertToSimple(monthlyBudget);
    const monthlyBudgetDocument = new this.monthlyBudgetModel(monthlyBudgetSimple);
    await monthlyBudgetDocument.save();
  }

  async update(monthlyBudget: MonthlyBudget): Promise<void> {
    const monthlyBudgetSimple = convertToSimple(monthlyBudget);
    await this.monthlyBudgetModel.updateOne(
      {
        id: monthlyBudget.id,
        year: monthlyBudget.year,
        month: monthlyBudget.month,
      },
      monthlyBudgetSimple,
    );
  }

  async assignBudget(
    amount: UnsignedAmount,
    subCategoryId: string,
    month: string,
    year: string,
  ): Promise<void> {
    const monthlyBudgetModel = await this.monthlyBudgetModel
      .findOne({
        month,
        year,
      })
      .exec();

    if (!monthlyBudgetModel) {
      const newMonthlyBudget = MonthlyBudget.CREATE(
        uuidv4(),
        month,
        year,
        subCategoryId,
        amount,
        new SignedAmount(0),
        new SignedAmount(0),
        new Date(),
        new Date(),
      );

      await this.createOne(newMonthlyBudget);
      return;
    }

    const monthlyBudget = MonthlyBudget.RETRIEVE(
      monthlyBudgetModel.id,
      monthlyBudgetModel.month,
      monthlyBudgetModel.year,
      subCategoryId,
      amount,
      monthlyBudgetModel.activity,
      monthlyBudgetModel.available,
      monthlyBudgetModel.createdAt,
      new Date(),
    );

    await this.monthlyBudgetModel.updateOne(
      {
        id: monthlyBudget.id,
        year: monthlyBudget.year,
        month: monthlyBudget.month,
      },
      monthlyBudget,
    );
  }

  async deleteBySubCategoryId(subCategoryId: string): Promise<void> {
    await this.monthlyBudgetModel.deleteMany({
      subCategoryId,
    });
  }
}
