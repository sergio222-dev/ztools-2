import { FlowTypeValue } from '@budget/shared/domain/enums/FlowType';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

export class TransactionUpdaterService {
    private readonly transaction: Transaction;

    constructor(transaction: Transaction) {
        this.transaction = Transaction.RETRIEVE(
            transaction.id,
            transaction.inflow,
            transaction.outflow,
            transaction.payee,
            transaction.memo,
            transaction.subCategoryId,
            transaction.date,
            transaction.cleared,
            transaction.accountId,
            transaction.userId,
            transaction.createdAt,
            new Date(),
        );
    }

    updateTransaction(
        id: string,
        inflow: string,
        outflow: string,
        payee: string,
        memo: string,
        subCategoryId: string,
        date: Date,
        cleared: boolean,
        accountId: string,
    ): Transaction {
        const newInflow = new UnsignedAmount(inflow);
        const newOutflow = new UnsignedAmount(outflow);
        const newSubCategoryId = subCategoryId;

        if (
            !this.transaction.inflow.isEqualTo(newInflow) ||
            !this.transaction.outflow.isEqualTo(newOutflow)
        ) {
            this.transaction.setNewAmount(newInflow, newOutflow);
        }

        if (this.transaction.subCategoryId !== newSubCategoryId) {
            this.transaction.setSubCategoryId(newSubCategoryId);
        }

        if (this.transaction.accountId !== accountId) {
            this.transaction.setAccountId(accountId);
        }

        if (this.transaction.accountId !== accountId) {
            this.transaction.setAccountId(accountId);
        }

        if (this.transaction.date.toISOString() !== date.toISOString()) {
            this.transaction.setDate(date);
        }

        this.transaction.setMemo(memo);
        this.transaction.setPayee(payee);
        this.transaction.setCleared(cleared);

        return this.transaction;
    }

    getSignedAmount() {
        const { flowType, inflow, outflow } = this.transaction;

        switch (flowType) {
            case FlowTypeValue.IN: {
                return inflow;
            }
            case FlowTypeValue.OUT: {
                // eslint-disable-next-line unicorn/consistent-destructuring
                return outflow.negated();
            }
            default: {
                return new SignedAmount(0);
            }
        }
    }
}
