import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from '@budget/transactions/domain/Transaction.repository';
import { Transaction } from '@budget/transactions/domain/Transaction';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private transactionRepository: TransactionRepository,
  ) {}

  async createOne(transaction: Transaction): Promise<void> {
    await this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  async update(transaction: Transaction): Promise<void> {
    await this.transactionRepository.update(transaction);
  }

  async findOneById(id: string): Promise<Transaction> {
    return await this.transactionRepository.findOneById(id);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  async deleteBatch(ids: string[]): Promise<void> {
    await this.transactionRepository.deleteBatch(ids);
  }
}
