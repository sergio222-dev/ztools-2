import { inject, injectable } from 'tsyringe';
import { Transaction } from '../../domain/Transaction';
import { UseCase } from '@core/shared/application/UseCase';
import type { TransactionRepository } from '@core/budget/transaction/domain/TransactionRepository';

@injectable()
export class TransactionGetAllByAccountIdPaginated implements UseCase<unknown, Transaction[]> {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: TransactionRepository,
  ) {}

  async execute(page: { accountId: string; index: number; pageSize: number }): Promise<Transaction[]> {
    return await this.transactionRepository.getAllByAccountIdPaginated(
      page.accountId,
      page.index,
      page.pageSize,
    );
  }
}
