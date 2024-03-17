import { Inject, Injectable } from '@nestjs/common';

import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { TransactionDeletedEvent } from '@budget/transaction/domain/event/TransactionDeleted.event';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';
import { TransactionRepository } from '@budget/transaction/domain/Transaction.repository';
import { TransactionUpdaterService } from '@budget/transaction/domain/TransactionUpdater.service';
import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { EventBus } from '@shared/domain/bus/event/EventBus';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filter, FilterOperator, Operator } from '@shared/domain/criteria/Filter';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order, OrderTypes } from '@shared/domain/criteria/Order';
import { FilterByIds } from '@shared/domain/filter/FilterByIds';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    @Inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async createOne(
    id: string,
    inflow: UnsignedAmount,
    outflow: UnsignedAmount,
    payee: string,
    memo: string,
    subCategoryId: string,
    date: Date,
    cleared: boolean,
    accountId: string,
    userId: string,
  ): Promise<void> {
    const transaction = Transaction.CREATE(
      id,
      inflow,
      outflow,
      payee,
      memo,
      subCategoryId,
      date,
      cleared,
      accountId,
      userId,
    );

    await this.transactionRepository.save(transaction);
    await this.eventBus.publish(transaction.pullEvents());
  }

  async findAll(userId: string): Promise<Transaction[]> {
    const filters = new Filters([FilterByUser.fromValue(userId)]);

    const criteria = new Criteria(filters, Order.fromValues(), 0, 0);
    return this.transactionRepository.matching(criteria);
  }

  async update(
    id: string,
    userId: string,
    inflow?: string,
    outflow?: string,
    payee?: string,
    memo?: string,
    subCategoryId?: string,
    date?: string,
    cleared?: boolean,
    accountId?: string,
  ): Promise<void> {
    const criteria = Criteria.aggregateOwnershipCriteria(id, userId);
    const oldTransactions = await this.transactionRepository.matching(criteria);

    if (oldTransactions.length !== 1) {
      // TODO: domain exception
      throw new Error(`Transaction with id ${id} not found`);
    }

    const [oldTransaction] = oldTransactions;

    const transactionUpdaterService = new TransactionUpdaterService(oldTransaction);

    const newTransaction = transactionUpdaterService.updateTransaction(
      id,
      inflow ?? oldTransaction.inflow.amount,
      outflow ?? oldTransaction.outflow.amount,
      payee ?? oldTransaction.payee,
      memo ?? oldTransaction.memo,
      subCategoryId ?? oldTransaction.subCategoryId,
      date ? new Date(date) : oldTransaction.date,
      cleared ?? oldTransaction.cleared,
      accountId ?? oldTransaction.accountId,
    );

    await this.transactionRepository.save(newTransaction);

    await this.eventBus.publish(newTransaction.pullEvents());
  }

  async findOneById(id: string, userId: string): Promise<Transaction> {
    const criteria = Criteria.aggregateOwnershipCriteria(id, userId);
    const transaction = await this.transactionRepository.matching(criteria);

    if (transaction.length !== 1) {
      // TODO: domain exception
      throw new Error(`Transaction with id ${id} not found`);
    }

    return transaction[0];
  }

  async findAllByAccountId(accountId: string, userId: string): Promise<Transaction[]> {
    const filterList: Filter[] = [];

    const byUserId = FilterByUser.fromValue(userId);
    const byAccount = new Filter('accountId', FilterOperator.fromValue(Operator.EQUAL), accountId);

    filterList.push(byUserId, byAccount);

    const filters = new Filters(filterList);

    const criteria = new Criteria(filters, Order.fromValues('createdAt', OrderTypes.ASC), 0, 0);

    return this.transactionRepository.matching(criteria);
  }

  async findAllBySubCategoryId(subCategoryId: string, userId: string): Promise<Transaction[]> {
    const filterList: Filter[] = [];

    const byUserId = FilterByUser.fromValue(userId);
    filterList.push(byUserId);
    const byAccount = new Filter('accountId', FilterOperator.fromValue(Operator.EQUAL), subCategoryId);
    filterList.push(byAccount);

    const filters = new Filters(filterList);

    const criteria = new Criteria(filters, Order.fromValues('name', OrderTypes.ASC), 0, 0);

    return this.transactionRepository.matching(criteria);
  }

  async deleteOneById(id: string, userId: string): Promise<void> {
    const transaction = await this.findOneById(id, userId);
    const transactionService = new TransactionUpdaterService(transaction);
    const signedAmount = transactionService.getSignedAmount();

    // TODO should be in the service
    const deletedEvent = new TransactionDeletedEvent(
      transaction.id,
      signedAmount.negated().amount,
      transaction.subCategoryId,
      transaction.accountId,
      transaction.date.toISOString(),
      userId,
    );

    await this.transactionRepository.delete([transaction]);
    await this.eventBus.publish([deletedEvent]);
  }

  async moveToSubCategory(
    fromSubCategoryId: string,
    toSubCategoryId: string,
    userId: string,
  ): Promise<void> {}

  async deleteBatch(ids: string[], userId: string): Promise<void> {
    const byIds = FilterByIds.fromValue(ids);
    const byUserId = FilterByUser.fromValue(userId);

    const filters = new Filters([byIds, byUserId]);
    const criteria = new Criteria(filters, Order.fromValues('createdAt', OrderTypes.ASC), 0, 0);

    const transactions = await this.transactionRepository.matching(criteria);
    const deleteEvents: DomainEvent[] = [];
    for (const transaction of transactions) {
      const transactionService = new TransactionUpdaterService(transaction);
      const signedAmount = transactionService.getSignedAmount();
      deleteEvents.push(
        new TransactionDeletedEvent(
          transaction.id,
          signedAmount.negated().amount,
          transaction.subCategoryId,
          transaction.accountId,
          transaction.date.toISOString(),
          userId,
        ),
      );
    }

    await this.transactionRepository.delete(transactions);
    await this.eventBus.publish(deleteEvents);
  }
}
