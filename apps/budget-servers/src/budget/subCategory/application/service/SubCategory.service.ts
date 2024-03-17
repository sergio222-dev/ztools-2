import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { FilterByIds } from '@shared/domain/filter/FilterByIds';
import { v4 as uuid } from 'uuid';

import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { SubCategoryRepository } from '@budget/subCategory/domain/SubCategory.repository';
import { TransactionDeletedEvent } from '@budget/transaction/domain/event/TransactionDeleted.event';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';
import { TransactionRepository } from '@budget/transaction/domain/Transaction.repository';
import { TransactionUpdaterService } from '@budget/transaction/domain/TransactionUpdater.service';
import { EventBus } from '@shared/domain/bus/event/EventBus';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filter, FilterOperator, Operator } from '@shared/domain/criteria/Filter';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order, OrderTypes } from '@shared/domain/criteria/Order';
import { FilterById } from '@shared/domain/filter/FilterById';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject('SubCategoryRepository')
    private readonly subCategoryRepository: SubCategoryRepository,
    private readonly commandBus: CommandBus,
    private readonly configService: ConfigService,
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    @Inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async findAllByCategoryId(categoryId: string, userId: string): Promise<SubCategory[]> {
    const filtersList: Filter[] = [];

    const byUserId = FilterByUser.fromValue(userId);
    filtersList.push(byUserId);
    const byCategoryId = new Filter('categoryId', FilterOperator.fromValue(Operator.EQUAL), categoryId);
    filtersList.push(byCategoryId);

    const filters = new Filters(filtersList);

    const criteria = new Criteria(filters, Order.fromValues('name', OrderTypes.ASC), 0, 0);

    const subCategories = await this.subCategoryRepository.matching(criteria);

    if (subCategories.length === 0) {
      throw new Error('Internal error, subcategory count not match');
    }

    return subCategories;
  }

  async findAll(userId: string): Promise<SubCategory[]> {
    const filtersList: Filter[] = [];

    const byUserId = FilterByUser.fromValue(userId);
    filtersList.push(byUserId);

    const filters = new Filters(filtersList);

    const criteria = new Criteria(filters, Order.fromValues('name', OrderTypes.ASC), 0, 0);

    const subCategories = await this.subCategoryRepository.matching(criteria);

    if (subCategories.length === 0) {
      throw new Error('Internal error, subcategory count not match');
    }

    return subCategories;
  }

  async findOneById(id: string, userId: string): Promise<SubCategory> {
    const filtersList: Filter[] = [];

    const byUserId = FilterByUser.fromValue(userId);
    filtersList.push(byUserId);
    const byId = FilterById.fromValue(id);
    filtersList.push(byId);

    const filters = new Filters(filtersList);

    const criteria = new Criteria(filters, Order.fromValues('name', OrderTypes.ASC), 0, 0);

    const subCategories = await this.subCategoryRepository.matching(criteria);

    if (subCategories.length === 0) {
      throw new Error('Internal error, subcategory count not match');
    }

    if (subCategories.length > 1) {
      throw new Error('Internal error, subcategory count not match');
    }

    return subCategories[0];
  }

  async deleteOneById(id: string, userId: string): Promise<void> {
    const byId = FilterById.fromValue(id);
    const byUserId = FilterByUser.fromValue(userId);

    const filters = new Filters([byId, byUserId]);
    const criteria = new Criteria(filters, Order.fromValues('createdAt', OrderTypes.ASC), 0, 0);

    const subCategories = await this.subCategoryRepository.matching(criteria);

    if (subCategories.length > 1) {
      throw new Error('Internal error, subcategory count not match');
    }

    if (subCategories.length === 0) {
      throw new Error('Internal error, subcategory not found');
    }

    //
    // // check if new Sub Category exists
    // const byNewId                = FilterById.fromValue(newSubCategoryId)
    // const newSubCategoryfilters  = new Filters([byNewId, byUserId])
    // const newSubCategoryCriteria = new Criteria(newSubCategoryfilters,
    //   Order.fromValues('createdAt', OrderTypes.ASC),
    //   0,
    //   0)
    //
    // const newSubCategory = await this.subCategoryRepository.matching(newSubCategoryCriteria)
    //
    // if (newSubCategory.length === 0) {
    //   throw new Error('Internal error, new subcategory not found');
    // }
    //
    // // get all current transaction from the subCategory
    // const bySubCategoryId     = new Filter('subCategoryId', FilterOperator.fromValue(Operator.EQUAL), id)
    // const transactionFilters  = new Filters([byUserId, bySubCategoryId])
    // const transactionCriteria = new Criteria(transactionFilters, Order.fromValues('createdAt', OrderTypes.ASC), 0, 0)
    //
    // const transactionsToDelete = await this.transactionRepository.matching(transactionCriteria)
    //
    // // create the new transactions
    // for (const t of transactionsToDelete) {
    //   const newTransaction = Transaction.CREATE(
    //     uuid(),
    //     t.inflow,
    //     t.outflow,
    //     t.payee,
    //     t.memo,
    //     newSubCategoryId,
    //     t.date,
    //     t.cleared,
    //     t.accountId,
    //     userId,
    //   );
    //
    //   await this.transactionRepository.save(newTransaction)
    //
    //   await this.eventBus.publish(newTransaction.pullEvents())
    // }
    //
    // // delete the transactions
    // for (const t of transactionsToDelete) {
    //   const transactionService = new TransactionUpdaterService(t)
    //
    //   const signedAmount = transactionService.getSignedAmount()
    //
    //   const deleteEvent = new TransactionDeletedEvent(
    //     t.id,
    //     signedAmount.negated().amount,
    //     t.subCategoryId,
    //     t.accountId,
    //     t.date.toDateString(),
    //     userId,
    //   )
    //
    //   await this.transactionRepository.delete([t])
    //   await this.eventBus.publish([deleteEvent])
    // }

    // delete the sub category
    await this.subCategoryRepository.delete(subCategories);
  }

  // async deleteBatch(ids: string[], userId: string): Promise<void> {
  //   const byIds    = FilterByIds.fromValue(ids)
  //   const byUserId = FilterByUser.fromValue(userId)
  //
  //   const filters = new Filters([byIds, byUserId])
  //   const criteria = new Criteria(filters, Order.fromValues('createdAt', OrderTypes.ASC), 0, 0)
  //
  //   // const subCategories = await this.subCategoryRepository.matching(criteria);
  //   await this.subCategoryRepository.delete([...ids])
  //
  //   // move
  //
  // }

  async create(subCategory: SubCategory): Promise<void> {
    await this.subCategoryRepository.save(subCategory);
  }

  async update(subCategory: SubCategory): Promise<void> {
    await this.subCategoryRepository.save(subCategory);
  }

  async getSystemSubCategoryId(userId: string): Promise<string | null> {
    const subCategoryName = this.configService.get<string>('SYSTEM_SUBCATEGORY_NAME');
    if (!subCategoryName) {
      // TODO: domain exception
      throw new Error('Internal configuration error in subcategory name');
    }

    return await this.subCategoryRepository.getSystemSubCategoryId(userId, subCategoryName);
  }
}
