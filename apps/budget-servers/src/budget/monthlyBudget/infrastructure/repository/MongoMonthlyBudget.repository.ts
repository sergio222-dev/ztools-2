import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { FindOneMonthlyBudget } from '@budget/monthlyBudget/domain/criteria/FindOneMonthlyBudget';
import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { MonthlyBudgetRepository } from '@budget/monthlyBudget/domain/MonthlyBudget.repository';
import {
    mapMonthlyBudgetToDomain,
    mapMonthlyBudgetToSchema,
    MonthlyBudgetSchemaType,
} from '@budget/monthlyBudget/infrastructure/mongo/monthlyBudget.schema';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filter, FilterOperator, Operator } from '@shared/domain/criteria/Filter';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';
import { MongoRepository } from '@shared/infrastructure/mongo/MongoRepository';

@Injectable()
export class MongoMonthlyBudgetRepository
    extends MongoRepository<MonthlyBudget, MonthlyBudgetSchemaType>
    implements MonthlyBudgetRepository
{
    constructor(@InjectConnection() connection: Connection) {
        super(connection);
    }

    protected collectionName(): string {
        return 'monthlyBudgets';
    }

    protected getMapperToSchema(): (value: MonthlyBudget) => MonthlyBudgetSchemaType {
        return mapMonthlyBudgetToSchema;
    }

    protected getMapperToDomain(): (value: MonthlyBudgetSchemaType) => MonthlyBudget {
        return mapMonthlyBudgetToDomain;
    }

    async save(monthlyBudget: MonthlyBudget) {
        await this.persist(monthlyBudget);
    }

    async delete(monthlyBudgets: MonthlyBudget[]) {
        await this.remove(monthlyBudgets);
    }

    async matching(criteria: Criteria): Promise<MonthlyBudget[]> {
        const documents = await this.searchByCriteria(criteria);
        const mapper = this.getMapperToDomain();

        return documents.map(element => mapper(element));
    }

    async findAllAvailableBefore(
        subCategoryId: string,
        month: string,
        year: string,
        userId: string,
    ): Promise<MonthlyBudget[]> {
        const cursor = this.collection<MonthlyBudgetSchemaType>().find({
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
                    {
                        $eq: ['$userId', userId],
                    },
                ],
            },
        });

        // @TODO: look out with this, need improvement
        const documents = await cursor.toArray();

        if (documents.length === 0) {
            return [];
        }

        const mapper = this.getMapperToDomain();

        return documents.map(element => mapper(element));
    }

    // @TODO: move this logic to the application layer
    async assignBudget(
        amount: UnsignedAmount,
        subCategoryId: string,
        month: string,
        year: string,
        userId: string,
    ): Promise<void> {
        // find one with criteria
        const filtersArray = FindOneMonthlyBudget.fromValues(subCategoryId, month, year);
        const byUser = FilterByUser.fromValue(userId);
        filtersArray.push(byUser);

        const filters = new Filters(filtersArray);

        const criteria = new Criteria(filters, Order.fromValues(), 0, 0);

        const documents = await this.searchByCriteria(criteria);

        if (documents.length === 0) {
            const newMonthlyBudget = MonthlyBudget.CREATE(
                uuidv4(),
                month,
                year,
                subCategoryId,
                amount,
                new SignedAmount(0),
                new SignedAmount(0),
                userId,
                new Date(),
                new Date(),
            );

            await this.save(newMonthlyBudget);
            return;
        }

        const [document] = documents;
        const monthlyBudgetDomain = this.getMapperToDomain()(document);

        monthlyBudgetDomain.setAssigned(amount);

        await this.save(monthlyBudgetDomain);
    }

    async deleteBySubCategoryId(monthlyBudget: MonthlyBudget): Promise<void> {
        const collection = this.collection();
        const filters: Filter[] = [];

        const filtersBySubCategoryId = new Filter(
            'subCategoryId',
            FilterOperator.fromValue(Operator.EQUAL),
            monthlyBudget.subCategoryId,
        );

        filters.push(filtersBySubCategoryId);

        const byUserId = FilterByUser.fromValue(monthlyBudget.userId);
        filters.push(byUserId);

        const filtersObject = new Filters(filters);

        const criteria = new Criteria(filtersObject, Order.fromValues(), 0, 0);

        const query = this._criteriaConverter.convert(criteria);

        await collection.deleteMany(query.filter);
    }
}
