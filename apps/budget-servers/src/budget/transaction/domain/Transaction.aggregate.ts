import { FlowType, FlowTypeValue } from '@budget/shared/domain/enums/FlowType';
import { Amount } from '@budget/shared/domain/valueObject/Amount';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { TransactionActivityCreatedEvent } from '@budget/transaction/domain/event/TransactionActivityCreated.event';
import { TransactionActivityUpdatedEvent } from '@budget/transaction/domain/event/TransactionActivityUpdated.event';
import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';

export class Transaction extends AggregateRoot {
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
    return this.determineFlowType();
  }

  get activity(): SignedAmount {
    switch (this.flowType) {
      case FlowTypeValue.IN: {
        return new SignedAmount(this.inflow.amount);
      }
      case FlowTypeValue.OUT: {
        return new SignedAmount(this.outflow.negated().amount);
      }
      default: {
        return new SignedAmount(0);
      }
    }
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
    const previousActivityValue = this.getCurrentActivityValue();

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

    if (this.eventExist(TransactionActivityUpdatedEvent)) {
      this.domainEvents = this.domainEvents.map(event => {
        if (event instanceof TransactionActivityUpdatedEvent) {
          return new TransactionActivityUpdatedEvent(
            this.id,
            newActivityValue.amount,
            previousActivityValue.amount,
            event.subCategoryId,
            event.previousSubCategoryId,
            event.date,
            event.previousDate,
            event.eventId,
            event.occurredOn,
          );
        }
        return event;
      });
    } else {
      this.record(
        new TransactionActivityUpdatedEvent(
          this.id,
          newActivityValue.amount,
          previousActivityValue.amount,
          this.subCategoryId,
          this.subCategoryId,
          this.date.toISOString(),
          this.date.toISOString(),
        ),
      );
    }
  }

  public setDate(newDate: Date) {
    const previousDate = this.date;
    this._date = newDate;

    if (this.eventExist(TransactionActivityUpdatedEvent)) {
      this.domainEvents = this.domainEvents.map(event => {
        if (event instanceof TransactionActivityUpdatedEvent) {
          return new TransactionActivityUpdatedEvent(
            this.id,
            event.amount,
            event.previousAmount,
            event.subCategoryId,
            event.previousSubCategoryId,
            newDate.toISOString(),
            previousDate.toISOString(),
            event.eventId,
            event.occurredOn,
          );
        }
        return event;
      });
    } else {
      this.record(
        new TransactionActivityUpdatedEvent(
          this.id,
          this.getCurrentActivityValue().amount,
          this.getCurrentActivityValue().amount,
          this.subCategoryId,
          this.subCategoryId,
          newDate.toISOString(),
          previousDate.toISOString(),
        ),
      );
    }
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

  public setSubCategoryId(newSubCategoryId: string) {
    const previousSubCategoryId = this.subCategoryId;
    this._subCategoryId = newSubCategoryId;

    if (this.eventExist(TransactionActivityUpdatedEvent)) {
      this.domainEvents = this.domainEvents.map(event => {
        if (event instanceof TransactionActivityUpdatedEvent) {
          return new TransactionActivityUpdatedEvent(
            this.id,
            event.amount,
            event.previousAmount,
            newSubCategoryId,
            previousSubCategoryId,
            event.date,
            event.previousDate,
          );
        }

        return event;
      });
    } else {
      this.record(
        new TransactionActivityUpdatedEvent(
          this.id,
          this.getCurrentActivityValue().amount,
          this.getCurrentActivityValue().amount,
          newSubCategoryId,
          previousSubCategoryId,
          this.date.toISOString(),
          this.date.toISOString(),
        ),
      );
    }
  }
}
