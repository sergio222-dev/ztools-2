import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from '@budget/transactions/domain/Transaction.repository';
import { Transaction } from '@budget/transactions/domain/Transaction';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private transactionRepository: TransactionRepository,
  ) {}

  async create(transaction: Transaction): Promise<void> {
    await this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }
}
