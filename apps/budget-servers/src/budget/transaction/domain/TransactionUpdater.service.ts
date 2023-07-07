import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

export class TransactionUpdaterService {
  constructor(private readonly transaction: Transaction) {}

  updateTransaction(
    id: string,
    inflow: string,
    outflow: string,
    payee: string,
    memo: string,
    subCategoryId: string,
    date: Date,
    cleared: boolean,
  ): Transaction {
    const newInflow = new UnsignedAmount(inflow);
    const newOutflow = new UnsignedAmount(outflow);
    const newSubCategoryId = subCategoryId;

    if (!this.transaction.inflow.isEqualTo(newInflow) || !this.transaction.outflow.isEqualTo(newOutflow)) {
      this.transaction.setNewAmount(newInflow, newOutflow);
    }

    if (this.transaction.subCategoryId !== newSubCategoryId) {
      this.transaction.setSubCategoryId(newSubCategoryId);
    }

    if (this.transaction.date.toISOString() !== date.toISOString()) {
      this.transaction.setDate(date);
    }

    this.transaction.setMemo(memo);
    this.transaction.setPayee(payee);
    this.transaction.setCleared(cleared);

    return this.transaction;
  }
}
