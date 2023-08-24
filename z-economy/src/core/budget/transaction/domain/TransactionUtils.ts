import { Transaction } from '@core/budget/transaction/domain/Transaction';

export function createEmptyTransaction(): Transaction {
  return new Transaction('', '', '', '', '', '', '', false);
}
