import { Inject, Injectable } from '@nestjs/common';

import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';
import { TransactionRepository } from '@budget/transaction/domain/Transaction.repository';
import { TransactionUpdaterService } from '@budget/transaction/domain/TransactionUpdater.service';
import { EventBus } from '@shared/domain/bus/event/EventBus';
import { TransactionDeletedEvent } from '@budget/transaction/domain/event/TransactionDeleted.event';
import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

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
    );

    await this.transactionRepository.save(transaction);
    await this.eventBus.publish(transaction.pullEvents());
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  async update(
    id: string,
    inflow: string,
    outflow: string,
    payee: string,
    memo: string,
    subCategoryId: string,
    date: string,
    cleared: boolean,
    accountId: string,
  ): Promise<void> {
    const oldTransaction = await this.transactionRepository.findOneById(id);

    const transactionUpdaterService = new TransactionUpdaterService(oldTransaction);

    const newTransaction = transactionUpdaterService.updateTransaction(
      id,
      inflow,
      outflow,
      payee,
      memo,
      subCategoryId,
      new Date(date),
      cleared,
      accountId,
    );

    await this.transactionRepository.update(newTransaction);

    await this.eventBus.publish(newTransaction.pullEvents());
  }

  async findOneById(id: string): Promise<Transaction> {
    return await this.transactionRepository.findOneById(id);
  }

  async findAllByAccountId(accountId: string): Promise<Transaction[]> {
    return await this.transactionRepository.findAllByAccountId(accountId);
  }

  async findAllBySubCategoryId(subCategoryId: string): Promise<Transaction[]> {
    return await this.transactionRepository.findAllBySubCategoryId(subCategoryId);
  }

  async deleteOneById(id: string): Promise<void> {
    const transaction = await this.transactionRepository.findOneById(id);
    const transactionService = new TransactionUpdaterService(transaction);
    const signedAmount = transactionService.getSignedAmount();

    const deletedEvent = new TransactionDeletedEvent(
      transaction.id,
      signedAmount.negated().amount,
      transaction.subCategoryId,
      transaction.accountId,
      transaction.date.toISOString(),
    );

    await this.transactionRepository.delete(id);
    await this.eventBus.publish([deletedEvent]);
  }

  async deleteBatch(ids: string[]): Promise<void> {
    const transactions = await this.transactionRepository.findByIds(ids);
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
        ),
      );
    }

    await this.transactionRepository.deleteBatch(ids);
    await this.eventBus.publish(deleteEvents);
  }
}
