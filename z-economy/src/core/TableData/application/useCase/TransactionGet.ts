import { Transaction } from '../../domain/Transaction';
import { injectable } from 'tsyringe';
import { UseCase } from '@core/shared/application/UseCase';

@injectable()
export class TransactionGet implements UseCase<unknown, Transaction> {
  execute() {
    return Transaction.CREATE(new Date(), 'Payee', 'Memo', 'Inflow', 'Outflow');
  }
}
