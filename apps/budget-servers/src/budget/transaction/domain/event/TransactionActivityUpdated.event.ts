import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export class TransactionActivityUpdatedEvent extends DomainEvent {
  get amount(): string {
    return this._amount;
  }

  get previousAmount(): string {
    return this._previousAmount;
  }

  get subCategoryId(): string {
    return this._subCategoryId;
  }

  get previousSubCategoryId(): string {
    return this._previousSubCategoryId;
  }

  get accountId(): string {
    return this._accountId;
  }

  get previousAccountId(): string {
    return this._previousAccountId;
  }

  get date(): string {
    return this._date;
  }

  get previousDate(): string {
    return this._previousDate;
  }
  constructor(
    id: string,
    private readonly _amount: string,
    private readonly _previousAmount: string,
    private readonly _subCategoryId: string,
    private readonly _previousSubCategoryId: string,
    private readonly _accountId: string,
    private readonly _previousAccountId: string,
    private readonly _date: string,
    private readonly _previousDate: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static get eventName(): string {
    return 'transaction.activity.updated';
  }
}
