import { FlowType, FlowTypeValue } from '@budget/shared/domain/enums/FlowType';
import { Amount } from '@budget/shared/domain/valueObject/Amount';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { TransactionActivityCreatedEvent } from '@budget/transaction/domain/event/TransactionActivityCreated.event';
import { TransactionActivityUpdatedEvent } from '@budget/transaction/domain/event/TransactionActivityUpdated.event';
import { TransactionDateUpdatedEvent } from '@budget/transaction/domain/event/TransactionDateUpdated.event';
import { TransactionSubCategoryIdUpdatedEvent } from '@budget/transaction/domain/event/TransactionSubCategoryIdUpdated.event';
import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';

export class Transaction extends AggregateRoot {
  private readonly _flowType: FlowType;

  get id(): string {
    return this._id;
  }

  get inflow(): UnsignedAmount {
    return this._inflow;
  }

  get outflow(): UnsignedAmount {
    return this._outflow;
  }

  get payee(): string {
    return this._payee;
  }

  get memo(): string {
    return this._memo;
  }

  get subCategoryId(): string {
    return this._subCategoryId;
  }

  get date(): Date {
    return this._date;
  }

  get cleared(): boolean {
    return this._cleared;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get flowType(): FlowType {
    return this._flowType;
  }

  private constructor(
    private _id: string,
    private _inflow: UnsignedAmount,
    private _outflow: UnsignedAmount,
    private _payee: string,
    private _memo: string,
    private _subCategoryId: string,
    private _date: Date,
    private _cleared: boolean,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {
    super();
    // determine flow type
    this._flowType = this.determineFlowType();
  }

  private determineFlowType(): FlowType {
    const zeroAmount = new Amount(0);
    if (this.inflow.isGreaterThan(zeroAmount) && this.outflow.isEqualTo(zeroAmount)) {
      return FlowTypeValue.IN;
    } else if (this.outflow.isGreaterThan(zeroAmount) && this.inflow.isEqualTo(zeroAmount)) {
      return FlowTypeValue.OUT;
    } else if (this.inflow.isEqualTo(zeroAmount) && this.outflow.isEqualTo(zeroAmount)) {
      return FlowTypeValue.NONE;
    } else {
      return FlowTypeValue.INVALID;
    }
  }

  static CREATE(
    id: string,
    inflow: UnsignedAmount,
    outflow: UnsignedAmount,
    payee: string,
    memo: string,
    subCategoryId: string,
    date: Date,
    cleared: boolean,
  ) {
    const transaction = new Transaction(
      id,
      inflow,
      outflow,
      payee,
      memo,
      subCategoryId,
      date,
      cleared,
      new Date(),
      new Date(),
    );

    const { flowType } = transaction;

    switch (flowType) {
      case FlowTypeValue.IN: {
        // this is a positive activity
        transaction.record(
          new TransactionActivityCreatedEvent(
            transaction.id,
            transaction.inflow.amount,
            transaction.subCategoryId,
            transaction.date.toISOString(),
          ),
        );
        break;
      }
      case FlowTypeValue.OUT: {
        // this is a negative activity
        transaction.record(
          new TransactionActivityCreatedEvent(
            transaction.id,
            transaction.outflow.negated().amount,
            transaction.subCategoryId,
            transaction.date.toISOString(),
          ),
        );
        break;
      }
      case FlowTypeValue.INVALID: {
        // TODO make an domain exception
        throw new Error('Invalid flow type');
      }
    }

    return transaction;
  }

  static RETRIEVE(
    id: string,
    inflow: UnsignedAmount,
    outflow: UnsignedAmount,
    payee: string,
    memo: string,
    subCategoryId: string,
    date: Date,
    cleared: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    return new Transaction(
      id,
      inflow,
      outflow,
      payee,
      memo,
      subCategoryId,
      date,
      cleared,
      createdAt,
      updatedAt,
    );
  }

  private getCurrentActivityValue(): SignedAmount {
    if (!this._inflow.isEqualTo(Amount.ZeroValue)) {
      return new SignedAmount(this.inflow.amount);
    } else if (this._outflow.isEqualTo(Amount.ZeroValue)) {
      return new SignedAmount(0);
    } else {
      return new SignedAmount(this.outflow.amount).negated();
    }
  }

  public setNewAmount(inflow: UnsignedAmount, outflow: UnsignedAmount) {
    const currentActivityValue = this.getCurrentActivityValue();

    if (inflow.isGreaterThan(Amount.ZeroValue) && outflow.isGreaterThan(Amount.ZeroValue)) {
      // TODO domain exception
      throw new Error('Invalid inflow and outflow amount');
    }

    if (!inflow.isEqualTo(this.inflow)) {
      this._inflow = inflow;
    }

    if (!outflow.isEqualTo(this.outflow)) {
      this._outflow = outflow;
    }

    const newActivityValue = this.getCurrentActivityValue();

    this.record(
      new TransactionActivityUpdatedEvent(
        this.id,
        newActivityValue.amount,
        currentActivityValue.amount,
        this.subCategoryId,
        this.date.toISOString(),
      ),
    );
  }

  public setDate(date: Date) {
    this.record(
      new TransactionDateUpdatedEvent(
        this.id,
        this.subCategoryId,
        date.toISOString(),
        this.date.toISOString(),
      ),
    );
    this._date = date;
  }

  public setCleared(cleared: boolean) {
    this._cleared = cleared;
  }

  public setPayee(payee: string) {
    this._payee = payee;
  }

  public setMemo(memo: string) {
    this._memo = memo;
  }

  public setSubCategoryId(subCategoryId: string) {
    this.record(
      new TransactionSubCategoryIdUpdatedEvent(
        this.id,
        subCategoryId,
        this.subCategoryId,
        this.date.toISOString(),
      ),
    );
    this._subCategoryId = subCategoryId;
  }
}
