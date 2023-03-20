import { Transaction } from '../../domain/Transaction';
import { inject, injectable } from 'tsyringe';
import { UseCase } from '@core/shared/application/UseCase';
import * as TransactionRepository from '@core/transactions/domain/TransactionRepository';

@injectable()
export class TransactionGetAll implements UseCase<unknown, Transaction[]> {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: TransactionRepository.TransactionRepository,
  ) {}

  async execute(): Promise<Transaction[]> {
    return this.transactionRepository.getAll();
  }
}
