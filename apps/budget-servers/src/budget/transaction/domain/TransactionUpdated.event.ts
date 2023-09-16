import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export class TransactionUpdatedEvent extends DomainEvent {
  get inflow(): string {
    return this._inflow;
  }

  get previousInflow(): string {
    return this._previousInflow;
  }

  get outflow(): string {
    return this._outflow;
  }

  get previousOutflow(): string {
    return this._previousOutflow;
  }

  get subCategoryId(): string {
    return this._subCategoryId;
  }

  get previousSubCategoryId(): string {
    return this._previousSubCategoryId;
  }
  constructor(
    id: string,
    private readonly _inflow: string,
    private readonly _previousInflow: string,
    private readonly _outflow: string,
    private readonly _previousOutflow: string,
    private readonly _subCategoryId: string,
    private readonly _previousSubCategoryId: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static get eventName(): string {
    return 'transaction.updated';
  }
}
