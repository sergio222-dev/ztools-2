import { Inject, Injectable } from '@nestjs/common';

import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';
import { TransactionRepository } from '@budget/transaction/domain/Transaction.repository';
import { TransactionUpdaterService } from '@budget/transaction/domain/TransactionUpdater.service';
import { EventBus } from '@shared/domain/bus/event/EventBus';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';

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

  async deleteOneById(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  async deleteBatch(ids: string[]): Promise<void> {
    await this.transactionRepository.deleteBatch(ids);
  }
}
