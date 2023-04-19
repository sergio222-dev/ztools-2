import { inject, injectable } from 'tsyringe';
import { Transaction } from '../../domain/Transaction';
import { UseCase } from '@core/shared/application/UseCase';
import type { TransactionRepository } from '@core/budget/transaction/domain/TransactionRepository';

@injectable()
export class TransactionGetAll implements UseCase<unknown, Transaction[]> {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: TransactionRepository,
  ) {}

  async execute(): Promise<Transaction[]> {
    return await this.transactionRepository.getAll();
  }
}
