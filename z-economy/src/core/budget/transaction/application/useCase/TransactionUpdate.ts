import { inject, injectable } from 'tsyringe';
import { UseCase } from '@core/shared/application/UseCase';
import type { TransactionRepository } from '@core/budget/transaction/domain/TransactionRepository';
import { Transaction } from '@core/budget/transaction/domain/Transaction';

@injectable()
export class TransactionUpdate implements UseCase<unknown, void> {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: TransactionRepository,
  ) {}

  async execute(t: Transaction): Promise<void> {
    return await this.transactionRepository.update(t);
  }
}
