import { Transaction } from '../../../domain/Transaction';
import { TransactionRepository } from '../../../domain/Transaction.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TransactionAll {
  constructor(
    @Inject('TransactionRepository')
    private repository: TransactionRepository,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.repository.findAll();
  }
}
