import { inject, injectable } from 'tsyringe';
import { UseCase } from '@core/shared/application/UseCase';
import type { TransactionRepository } from '@core/budget/transaction/domain/TransactionRepository';

@injectable()
export class TransactionDeleteBatch implements UseCase<unknown, void> {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: TransactionRepository,
  ) {}

  async execute(t: { ids: string[] }): Promise<void> {
    return await this.transactionRepository.deleteBatch(t);
  }
}
