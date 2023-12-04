import { inject, injectable } from 'tsyringe';
import { Transaction } from '../../domain/Transaction';
import { UseCase } from '@core/shared/application/UseCase';
import type { TransactionRepository } from '@core/budget/transaction/domain/TransactionRepository';

@injectable()
export class TransactionGetAllPaginated implements UseCase<unknown, Transaction[]> {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: TransactionRepository,
  ) {}

  async execute(page: { index: number; pageSize: number }): Promise<Transaction[]> {
    return await this.transactionRepository.getAllPaginated(page.index, page.pageSize);
  }
}
