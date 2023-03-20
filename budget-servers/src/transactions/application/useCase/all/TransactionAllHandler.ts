import { UseCase } from '../../../../shared/application/UseCase';
import { Transaction } from '../../../domain/Transaction';
import { TransactionAll } from './TransactionAll';

export class TransactionAllHandler implements UseCase<never, Transaction[]> {
  constructor(private readonly transactionAll: TransactionAll = new TransactionAll()) {}

  execute() {
    return Promise.resolve(this.transactionAll.getAll());
  }
}
